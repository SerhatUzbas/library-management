import { Flex, Text } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
	const navigate = useNavigate()
	return (
		<Flex align='center' maw={100} gap={5} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
			<IconChevronLeft size={20} color='#F02437' />
			<Text fz={16} fw={600} c='#F02437'>
				Back
			</Text>
		</Flex>
	)
}

export default BackButton
