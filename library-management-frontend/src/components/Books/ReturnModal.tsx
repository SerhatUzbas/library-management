import { Button, Flex, Modal, Stack, Text } from '@mantine/core'

const ReturnModal = ({ opened, setClosed, handleReturnBook }: { opened: boolean; setClosed: () => void; handleReturnBook: () => void }) => {
	return (
		<Modal centered title='Return Book' opened={opened} onClose={() => setClosed()}>
			<Stack align='center'>
				<Text>Are you sure you want to return this book?</Text>
				<Flex gap='xs' align='center'>
					<Button color='gray' onClick={() => setClosed()}>
						Cancel
					</Button>
					<Button
						color='red'
						onClick={() => {
							handleReturnBook()
							setClosed()
						}}>
						Return
					</Button>
				</Flex>
			</Stack>
		</Modal>
	)
}

export default ReturnModal
