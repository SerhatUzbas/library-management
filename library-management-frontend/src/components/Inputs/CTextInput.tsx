import { TextInput, TextInputProps } from '@mantine/core'

const CTextInput = ({ height = 72, error, disabled, backgroundColor = '#FFF', placeholder = 'Yazınız', ...props }: TextInputProps & { backgroundColor?: string }) => {
	return (
		<TextInput
			styles={{
				root: {
					position: 'relative',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: disabled ? '#F5F6F6' : backgroundColor,
					cursor: disabled ? 'not-allowed' : 'auto',
					border: '1px solid #EAEAEA',
					borderRadius: 12,
					padding: '17px 6px 17px 20px',
					height: height,
				},
				input: { fontSize: 16, fontWeight: 700, border: 'none', textAlign: 'right', backgroundColor: disabled ? '#F5F6F6 !important' : backgroundColor },
				label: { fontSize: 16, fontWeight: 700, color: '#B1B1B1', cursor: disabled ? 'not-allowed' : 'auto' },
				error: { fontSize: 14, fontWeight: 400, position: 'absolute', bottom: 0, right: 20, opacity: error ? 100 : 0 },
				wrapper: { flexGrow: 1 },
			}}
			placeholder={placeholder}
			disabled={disabled}
			error={error}
			{...props}
		/>
	)
}

export default CTextInput
