import { Button, Flex, Modal, Stack, Text } from '@mantine/core'

const DeleteModal = ({ opened, setClosed, deleteFunction }: { opened: boolean; setClosed: () => void; deleteFunction: () => void }) => {
	return (
		<Modal centered opened={opened} onClose={() => setClosed()}>
			<Stack align='center'>
				<Text fw={500} size='lg'>
					Are you sure you want to delete this user?
				</Text>
				<Flex justify='center' align='center' gap='xs'>
					<Button
						color='gray'
						radius={6}
						size='sm'
						onClick={() => {
							setClosed()
						}}>
						Cancel
					</Button>
					<Button
						color='red'
						radius={6}
						size='sm'
						onClick={() => {
							deleteFunction()
							setClosed()
						}}>
						Delete
					</Button>
				</Flex>
			</Stack>
		</Modal>
	)
}

export default DeleteModal
