import { getInitials } from '@/lib/utils'
import { Paper, Text, PaperProps, Flex, Stack } from '@mantine/core'
import CAvatar from 'components/CAvatar'
import { Link } from 'react-router-dom'

interface UserItemProps extends PaperProps {
	id: number
	name: string
	pastBorrows: number
	currentBorrows: number
}

const UserItem = ({ id, name = 'Serhat Uzbaş', pastBorrows = 0, currentBorrows = 0, ...props }: UserItemProps) => {
	return (
		<Link to={`/users/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
			<Paper
				shadow='sm'
				p='md'
				withBorder
				{...props}
				sx={(theme: any) => ({
					'&:hover': {
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
						transform: 'translateY(-2px)',
						transition: 'all 0.2s ease',
					},
				})}>
				<Flex gap='md' align='center'>
					<CAvatar size='lg' radius='xl' isCurrentlyBorrowed={currentBorrows > 0} sx={{ flexShrink: 0 }}>
						{getInitials(name)}
					</CAvatar>
					<Stack gap={4} style={{ flex: 1 }}>
						<Text size='lg' fw={600} lineClamp={1}>
							{name}
						</Text>
						<Flex gap='md'>
							<Text size='sm' c='dimmed'>
								Past: {pastBorrows} borrowed
							</Text>
							<Text size='sm' c='dimmed'>
								Active: {currentBorrows} borrowed
							</Text>
						</Flex>
					</Stack>
				</Flex>
			</Paper>
		</Link>
	)
}

export default UserItem
