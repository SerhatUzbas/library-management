import { Badge, BadgeProps } from '@mantine/core'

interface CBadgeProps extends BadgeProps {
	available: boolean
}
const CBadge = ({ available, children, ...props }: CBadgeProps) => {
	return (
		<Badge color={available ? '#9dc487' : '#dc3545'} {...props}>
			{children}
		</Badge>
	)
}

export default CBadge
