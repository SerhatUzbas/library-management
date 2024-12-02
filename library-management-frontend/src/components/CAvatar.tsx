import { Avatar, AvatarProps } from '@mantine/core'

interface CAvatarProps extends AvatarProps {
	isCurrentlyBorrowed?: boolean
}
const CAvatar = ({ children, isCurrentlyBorrowed = false, ...props }: CAvatarProps) => {
	return (
		<Avatar color={isCurrentlyBorrowed ? '#dc3545' : '#345e1d'} {...props}>
			{children}
		</Avatar>
	)
}

export default CAvatar
