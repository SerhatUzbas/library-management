import { CategoryDTO } from '@/lib/types'
import BookService from '@/services/BookService'
import { Box, Modal, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import SubmitButton from 'components/Buttons/SubmitButton'
import CTextInput from 'components/Inputs/CTextInput'

const CategoryCreate = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
	const queryClient = useQueryClient()
	const form = useForm<CategoryDTO>({
		initialValues: {
			name: '',
		},
		validate: {
			name: (value) => (!value ? 'You must enter a category' : null),
		},
	})

	const handleSubmit = async (values: typeof form.values) => {
		const response = await BookService.createCategory(values)

		if (response.status === 201) {
			queryClient.invalidateQueries({ queryKey: ['globalCategoryOptions'] })
			showNotification({
				title: 'Success',
				message: response.data.message,
				color: 'green',
			})
			onClose()
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
		<Modal title='Add Category' styles={{ title: { fontSize: 18, fontWeight: 600 } }} centered opened={opened} onClose={onClose}>
			<Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap={10}>
					<CTextInput label='Category' placeholder='Enter category' {...form.getInputProps('name')} />
					<SubmitButton type='submit'>Add Category</SubmitButton>
				</Stack>
			</Box>
		</Modal>
	)
}

export default CategoryCreate
