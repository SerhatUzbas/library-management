import { Stack, Text, TextInput, TextInputProps } from '@mantine/core'

interface CTextInputNewProps extends TextInputProps {
	withLabel?: boolean
	label?: string
}

const CTextInputNew = ({ withLabel = false, label, ...props }: CTextInputNewProps) => {
	return (
		<Stack gap={4} w={{ base: '100%', md: 'fit-content' }}>
			{withLabel && <Text size='sm'>{label}</Text>}
			<TextInput radius='md' {...props} />
		</Stack>
	)
}

export default CTextInputNew
