import { Paper, Text, Tabs, Container, Group, Card, Stack, Box, Button, Flex } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserService from '@/services/UserService'
import BorrowService from '@/services/BorrowService'
import { getInitials } from '@/lib/utils'
import SubmitButton from 'components/Buttons/SubmitButton'
import CRating from 'components/CRating'
import CAvatar from 'components/CAvatar'
import { useDisclosure } from '@mantine/hooks'
import DeleteModal from 'components/DeleteModal'
import ReturnModal from 'components/Books/ReturnModal'

interface Book {
	id?: number
	title?: string
	writer?: string
	publishYear?: number
	averageRating?: number
}

interface Borrow {
	id?: number
	book?: Book
	borrowDate?: string
	returnDate?: string
	userId?: number
	userRating?: number
}

const BookCard = ({ book, borrowDate, returnDate, id, userRating }: Borrow) => {
	const queryClient = useQueryClient()
	const params = useParams()
	const [returnModalOpened, handleReturnModal] = useDisclosure(false)
	const handleReturnBook = async () => {
		if (!id) return
		const response = await BorrowService.returnBook(id)
		if (response.status === 200) {
			showNotification({
				title: 'Success',
				message: 'Book returned successfully',
				color: 'green',
			})
		} else {
			showNotification({
				title: 'Error',
				message: 'Failed to return book',
				color: 'red',
			})
		}
		queryClient.invalidateQueries({ queryKey: ['user-detail', params.id] })
	}
	return (
		<Card
			w='100%'
			withBorder
			shadow='sm'
			radius='md'
			mb='sm'
			sx={{
				transition: 'transform 200ms ease, box-shadow 200ms ease',

				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
				},
			}}>
			<Stack gap='xs'>
				<Group justify='space-between' align='flex-start'>
					<Box>
						<Text fw={500} size='lg'>
							{book?.title}
						</Text>
						<Text size='sm' c='dimmed'>
							by {book?.writer}
						</Text>
					</Box>
					<Text size='sm' c='dimmed'>
						ID: {book?.id}
					</Text>
				</Group>

				<Stack gap='xs'>
					<Text size='sm' c='dimmed'>
						Published Year: {book?.publishYear}
					</Text>
					<Flex gap='xs'>
						<Text size='sm' c='dimmed'>
							Average Rating:
						</Text>
						<CRating value={book?.averageRating} />
						<Text size='sm' c='dimmed' fw={book?.averageRating ? 500 : 400}>
							{book?.averageRating ? book?.averageRating : '(Not rated yet)'}
						</Text>
					</Flex>
					<Flex gap='xs'>
						<Text size='sm' c='dimmed'>
							User Rating:
						</Text>
						<CRating value={userRating} />
						<Text size='sm' c='dimmed' fw={userRating ? 500 : 400}>
							{userRating ? userRating : '(Not rated yet)'}
						</Text>
					</Flex>
				</Stack>

				<Group justify='space-between' align='flex-start'>
					<Group>
						<Text size='sm' c='dimmed'>
							Borrowed: {new Date(borrowDate || '').toLocaleDateString()}
						</Text>
						{returnDate && (
							<Text size='sm' c='dimmed'>
								Returned: {new Date(returnDate || '').toLocaleDateString()}
							</Text>
						)}
					</Group>
					<Flex gap='xs'>
						<Button variant='outline' c='#dc3545' color='#dc3545' radius={6} size='sm' component={Link} to={`/books/${id}`}>
							View Book
						</Button>
						{!returnDate && (
							<SubmitButton size='sm' h={36} onClick={() => handleReturnModal.open()}>
								Return Book
							</SubmitButton>
						)}
					</Flex>
				</Group>
			</Stack>
			<ReturnModal opened={returnModalOpened} setClosed={() => handleReturnModal.close()} handleReturnBook={handleReturnBook} />
		</Card>
	)
}

const UserDetail = () => {
	const queryClient = useQueryClient()
	const params = useParams()
	const navigate = useNavigate()
	const [deleteModalOpened, handleDeleteModal] = useDisclosure(false)
	const { data } = useQuery({
		queryKey: ['user-detail', params.id],
		queryFn: () => UserService.getUser(params.id!),
	})

	const handleDeleteUser = async () => {
		const response = await UserService.softDeleteUser(params.id!)
		if (response.status === 200) {
			showNotification({
				title: 'Success',
				message: 'User deleted successfully',
				color: 'green',
			})
			queryClient.invalidateQueries({ queryKey: ['user-detail', params.id] })
			navigate('/users')
		} else {
			showNotification({
				title: 'Error',
				message: response.data.message,
				color: 'red',
			})
		}
	}

	return (
		<Box>
			<Container fluid size='md' py='sm'>
				<Paper p='md'>
					<Group justify='space-between' align='center'>
						<Group>
							<CAvatar size='lg' radius='xl' isCurrentlyBorrowed={data?.data?.data?.currentBorrows.length > 0} sx={{ flexShrink: 0 }}>
								{getInitials(data?.data?.data?.name || '')}
							</CAvatar>
							<Text fw={500} size='lg'>
								{data?.data?.data?.name}
							</Text>
						</Group>
						<Button color='red' radius={6} size='sm' onClick={() => handleDeleteModal.open()}>
							Delete User
						</Button>
					</Group>
					<Tabs mt='md' defaultValue='current' color='#dc3545'>
						<Tabs.List mb='md'>
							<Tabs.Tab value='current'>Current Borrowed Books ({data?.data?.data?.currentBorrows.length})</Tabs.Tab>
							<Tabs.Tab value='past'>Past Borrowed Books ({data?.data?.data?.pastBorrows.length})</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value='current'>
							{data?.data?.data?.currentBorrows.map((borrow: Borrow) => (
								<BookCard
									key={borrow.id}
									book={borrow.book}
									borrowDate={borrow.borrowDate}
									returnDate={borrow.returnDate}
									id={borrow.id}
									userId={borrow.userId}
									userRating={borrow.userRating}
								/>
							))}
							{data?.data?.data?.currentBorrows.length === 0 && (
								<Text c='dimmed' ta='center' py='xl'>
									No books currently borrowed
								</Text>
							)}
						</Tabs.Panel>

						<Tabs.Panel value='past'>
							{data?.data?.data?.pastBorrows.map((borrow: Borrow) => (
								<BookCard
									key={borrow?.id}
									book={borrow?.book}
									borrowDate={borrow?.borrowDate}
									returnDate={borrow?.returnDate}
									id={borrow?.id}
									userId={borrow?.userId}
									userRating={borrow?.userRating}
								/>
							))}
							{data?.data?.data?.pastBorrows.length === 0 && (
								<Text c='dimmed' ta='center' py='xl'>
									No past borrowed books
								</Text>
							)}
						</Tabs.Panel>
					</Tabs>
				</Paper>
			</Container>
			<DeleteModal opened={deleteModalOpened} setClosed={() => handleDeleteModal.close()} deleteFunction={handleDeleteUser} />
		</Box>
	)
}

export default UserDetail
