import { BookDTO } from '@/lib/types'
import { useCategoryOptionsQuery } from '@/queries/GlobalQueries'
import BookService from '@/services/BookService'
import { useBookListStore } from '@/stores/BookListStore'

import { Box, Modal, Select, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import SubmitButton from 'components/Buttons/SubmitButton'
import CRichTextEditor from 'components/Inputs/CRichTextEditor'

const BookCreate = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
	const queryClient = useQueryClient()
	const { title, writer, status, categoryId, page } = useBookListStore((state) => state.filter)
	const form = useForm({
		initialValues: {
			title: '',
			publishYear: '',
			writer: '',
			description: '',
			categoryId: '',
		},
		validate: {
			title: (value) => (value.length < 3 ? 'Title must be at least 3 characters long' : null),
			publishYear: (value) => (value.length < 4 ? 'Publish year must be at least 4 characters long' : null),
			writer: (value) => (value.length < 3 ? 'Writer must be at least 3 characters long' : null),
			description: (value) => (value.length < 10 ? 'Description must be at least 10 characters long' : null),
			categoryId: (value) => (!value ? 'You must select a category' : null),
		},
		transformValues: (values) => ({
			...values,
			categoryId: Number(values.categoryId),
		}),
	})

	const { data: categoryOptions } = useCategoryOptionsQuery({ enabled: opened })

	const handleSubmit = async (values: BookDTO) => {
		const response = await BookService.createBook(values)
		if (response.status === 201) {
			queryClient.invalidateQueries({ queryKey: ['books', { title, writer, status, categoryId, page }] })
			showNotification({
				title: 'Success',
				message: response.data.message,
				color: 'green',
			})
		} else {
			showNotification({
				title: 'Error',
				message: response.data.message,
				color: 'red',
			})
		}

		form.reset()
		onClose()
	}
	return (
		<Modal title='Add Book' size='xl' centered opened={opened} onClose={onClose}>
			<Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap={10}>
					<TextInput label='Title' withAsterisk placeholder='Enter title' {...form.getInputProps('title')} />
					<TextInput label='Publish Year' maxLength={4} withAsterisk placeholder='Enter publish year' {...form.getInputProps('publishYear')} />
					<TextInput label='Writer' withAsterisk placeholder='Enter writer' {...form.getInputProps('writer')} />
					<CRichTextEditor value={form.values.description} onChange={(value) => form.setFieldValue('description', value)} />
					<Select label='Category' withAsterisk placeholder='Select category' data={categoryOptions?.data?.data || []} {...form.getInputProps('categoryId')} />
					<SubmitButton type='submit'>Add Book</SubmitButton>
				</Stack>
			</Box>
		</Modal>
	)
}

export default BookCreate
