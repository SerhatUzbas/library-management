import { Select, SelectProps, Stack, Text } from '@mantine/core'

interface CSelectSearchebleProps extends SelectProps {
	withLabel?: boolean
	label?: string
}

const CSelectSearcheble = ({ withLabel = false, label, ...props }: CSelectSearchebleProps) => {
	return (
		<Stack gap={4} w={{ base: '100%', md: 'fit-content' }}>
			{withLabel && <Text size='sm'>{label}</Text>}
			<Select searchable radius='md' {...props} />
		</Stack>
	)
}

export default CSelectSearcheble
