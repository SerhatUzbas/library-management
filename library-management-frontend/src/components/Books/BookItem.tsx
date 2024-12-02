import { Book } from '@/lib/types'
import { Card, Group, Text, Stack } from '@mantine/core'
import CBadge from 'components/CBadge'
import { Link } from 'react-router-dom'

interface BookItemProps {
	book?: Book
}

const BookItem = ({ book }: BookItemProps) => {
	const isBorrowed = book?.status === 'BORROWED'
	return (
		<Link to={`/books/${book?.id}`} style={{ textDecoration: 'none' }}>
			<Card shadow='sm' padding='lg' radius='md' withBorder>
				<Stack justify='space-between' mb='md'>
					<Text fw={500} size='lg' truncate>
						{book?.title}
					</Text>
					<CBadge available={!isBorrowed}>{book?.status}</CBadge>
				</Stack>

				<Group gap='xs'>
					<Text size='sm' c='dimmed'>
						Author:
					</Text>
					<Text size='sm'>{book?.writer}</Text>
				</Group>

				<Group gap='xs'>
					<Text size='sm' c='dimmed'>
						Published:
					</Text>
					<Text size='sm'>{book?.publishYear}</Text>
				</Group>

				<Group gap='xs'>
					<Text size='sm' c='dimmed'>
						Rating:
					</Text>
					<Text size='sm'>{book?.averageRating?.toFixed(1) || '0.0'} / 5.0</Text>
				</Group>
			</Card>
		</Link>
	)
}

export default BookItem
