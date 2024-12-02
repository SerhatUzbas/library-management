import { Button, ButtonProps, ElementProps } from '@mantine/core'

type SubmitButtonProps = ButtonProps & ElementProps<'button', keyof ButtonProps>

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
	return (
		<Button color='#dc3545' h={48} px={18} radius={12} style={{ boxShadow: '0px 4px 24px 0px rgba(220, 53, 69, 0.30)' }} styles={{ section: { marginRight: 8 } }} {...props}>
			{children}
		</Button>
	)
}

export default SubmitButton
