import { UserDTO } from '@/lib/types'
import UserService from '@/services/UserService'
import { useUserListStore } from '@/stores/UserListStore'
import { Box, Modal, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import SubmitButton from 'components/Buttons/SubmitButton'
import CTextInput from 'components/Inputs/CTextInput'

const UserCreate = ({ opened, onClose }: { opened: boolean; onClose: () => void }) => {
	const { name, page } = useUserListStore((state) => state.filter)
	const queryClient = useQueryClient()
	const form = useForm<UserDTO>({
		initialValues: {
			name: '',
		},
		validate: {
			name: (value) => (!value ? 'You must enter a user' : null),
		},
	})

	const handleSubmit = async (values: typeof form.values) => {
		const response = await UserService.createUser(values)

		if (response.status === 201) {
			queryClient.invalidateQueries({ queryKey: ['user-list', { name, page }] })
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
		<Modal title='Add User' styles={{ title: { fontSize: 18, fontWeight: 600 } }} centered opened={opened} onClose={onClose}>
			<Box component='form' onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap={10}>
					<CTextInput label='User' placeholder='Enter user' {...form.getInputProps('name')} />
					<SubmitButton type='submit'>Add User</SubmitButton>
				</Stack>
			</Box>
		</Modal>
	)
}

export default UserCreate
