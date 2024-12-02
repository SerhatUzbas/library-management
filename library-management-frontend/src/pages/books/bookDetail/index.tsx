import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Text, Title, Stack, Group, LoadingOverlay, Rating, Flex, Box } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import BookService from '@/services/BookService'
import { useUserListQuery } from '@/queries/GlobalQueries'
import BorrowService from '@/services/BorrowService'
import CSelectSearcheble from 'components/Inputs/CSelectSearcheble'
import DeleteModal from 'components/DeleteModal'
import CBadge from 'components/CBadge'
import LandModal from 'components/Books/LandModal'
import ReturnModal from 'components/Books/ReturnModal'
import BookEdit from 'components/Books/BookEdit'

const BookDetail = () => {
	const { id } = useParams()
	const queryClient = useQueryClient()
	const [deleteModalOpened, handleDeleteModal] = useDisclosure(false)
	const [landModalOpened, handleLandModal] = useDisclosure(false)
	const [returnModalOpened, handleReturnModal] = useDisclosure(false)
	const [editModalOpened, handleEditModal] = useDisclosure(false)
	const navigate = useNavigate()

	const { data, isLoading } = useQuery({
		queryKey: ['book-detail', id],
		queryFn: () => BookService.getBook(id || ''),
	})

	const [borrowUserId, setBorrowUserId] = useState<string | null>(null)

	const { data: userListData } = useUserListQuery({ enabled: data?.data?.data?.status === 'AVAILABLE' })

	const handleBorrowBook = async () => {
		if (!borrowUserId || !id) return
		const response = await BorrowService.borrowBook({ userId: Number(borrowUserId), bookId: Number(id) })
		if (response.status === 201) {
			queryClient.invalidateQueries({ queryKey: ['book-detail', id] })
			showNotification({
				title: 'Success',
				message: response.data.message,
				color: 'green',
			})
		} else {
			showNotification({
				title: 'Error',
				message: response.data.message,
				color: 'red',
			})
		}
	}

	const handleReturnBook = async () => {
		const response = await BorrowService.returnBook(data?.data?.data?.borrows[0]?.id)
		if (response.status === 200) {
			queryClient.invalidateQueries({ queryKey: ['book-detail', id] })
			showNotification({
				title: 'Success',
				message: response.data.message,
				color: 'green',
			})
		} else {
			showNotification({
				title: 'Error',
				message: response.data.message,
				color: 'red',
			})
		}
	}

	const handleDeleteBook = async () => {
		const response = await BookService.softDeleteBook(id || '')
		if (response.status === 200) {
			showNotification({
				title: 'Success',
				message: response.data.message,
				color: 'green',
			})
			queryClient.invalidateQueries({ queryKey: ['book-detail', id] })
			navigate('/books')
		} else {
			showNotification({
				title: 'Error',
				message: response.data.message,
				color: 'red',
			})
		}
	}

	return (
		<Card shadow='sm' padding='lg' radius='md' withBorder pos='relative'>
			<LoadingOverlay visible={isLoading} overlayProps={{ radius: 'sm', blur: 2 }} />

			<Stack gap='lg'>
				<Group justify='space-between' align='center'>
					<Title order={2}>{data?.data?.data?.title}</Title>
					<Group gap='xs'>
						<Button variant='outline' color='#dc3545' radius={6} size='sm' onClick={() => handleEditModal.open()}>
							Edit Book
						</Button>
						<Button color='#dc3545' radius={6} size='sm' onClick={() => handleDeleteModal.open()}>
							Delete Book
						</Button>
					</Group>
				</Group>

				<Stack gap='xs'>
					<Card withBorder p='md' radius='md' bg='gray.0'>
						<Box dangerouslySetInnerHTML={{ __html: data?.data?.data?.description }} style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }} />
					</Card>

					<Group>
						<Text fw={700}>Writer:</Text>
						<Text>{data?.data?.data?.writer}</Text>
					</Group>

					<Group>
						<Text fw={700}>Publish Date:</Text>
						<Text>{data?.data?.data?.publishYear}</Text>
					</Group>

					<Group>
						<Text fw={700}>Status:</Text>
						<CBadge available={data?.data?.data?.status === 'AVAILABLE'}>{data?.data?.data?.status}</CBadge>
					</Group>

					{data?.data?.data?.status === 'BORROWED' && (
						<>
							<Group>
								<Text fw={700}>Borrowed Date:</Text>
								<Text>{data?.data?.data?.borrows[0]?.borrowDate}</Text>
							</Group>

							<Group>
								<Text fw={700}>Borrowed By:</Text>
								<Text>{data?.data?.data?.borrows[0]?.user?.name}</Text>
							</Group>
						</>
					)}
					<Group gap='xs'>
						<Text fw={700}>Average Rating:</Text>
						<Rating value={data?.data?.data?.averageRating} readOnly fractions={2} size='sm' />
						<Text size='sm' c='dimmed'>
							({data?.data?.data?.averageRating?.toFixed(1)})
						</Text>
					</Group>
					{data?.data?.data?.status === 'BORROWED' ? (
						<Button onClick={() => handleReturnModal.open()} color='#dc3545' mt='md'>
							Return Book
						</Button>
					) : (
						<Flex gap='xs' align='center' mt='md'>
							<Button onClick={() => handleLandModal.open()} color='#9dc487'>
								Land Book
							</Button>
							<CSelectSearcheble value={borrowUserId} onChange={(value) => setBorrowUserId(value)} data={userListData?.data?.data} radius='md' placeholder='Select a user' />
						</Flex>
					)}
				</Stack>
			</Stack>
			<DeleteModal opened={deleteModalOpened} setClosed={() => handleDeleteModal.close()} deleteFunction={handleDeleteBook} />
			<LandModal opened={landModalOpened} setClosed={() => handleLandModal.close()} handleLandBook={handleBorrowBook} />
			<ReturnModal opened={returnModalOpened} setClosed={() => handleReturnModal.close()} handleReturnBook={handleReturnBook} />
			{editModalOpened && <BookEdit opened={editModalOpened} onClose={() => handleEditModal.close()} book={data?.data?.data} bookId={id || ''} />}
		</Card>
	)
}

export default BookDetail
