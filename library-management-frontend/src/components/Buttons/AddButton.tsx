import { Button, ButtonProps, ElementProps } from '@mantine/core'
import { IconCirclePlus } from '@tabler/icons-react'

type AddButtonProps = ButtonProps & ElementProps<'button', keyof ButtonProps>

const AddButton = ({ children, ...props }: AddButtonProps) => {
	return (
		<Button
			color='#dc3545'
			h={48}
			px={18}
			leftSection={<IconCirclePlus />}
			radius={12}
			style={{ boxShadow: '0px 4px 24px 0px rgba(220, 53, 69, 0.30)' }}
			styles={{ section: { marginRight: 8 } }}
			{...props}>
			{children}
		</Button>
	)
}

export default AddButton
