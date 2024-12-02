import { Button, Flex, Modal, Stack, Text } from '@mantine/core'

const LandModal = ({ opened, setClosed, handleLandBook }: { opened: boolean; setClosed: () => void; handleLandBook: () => void }) => {
	return (
		<Modal centered title='Land Book' opened={opened} onClose={() => setClosed()}>
			<Stack align='center'>
				<Text>Are you sure you want to land this book?</Text>
				<Flex gap='xs' align='center'>
					<Button color='gray' onClick={() => setClosed()}>
						Cancel
					</Button>
					<Button
						color='#9dc487'
						onClick={() => {
							handleLandBook()
							setClosed()
						}}>
						Land
					</Button>
				</Flex>
			</Stack>
		</Modal>
	)
}

export default LandModal
