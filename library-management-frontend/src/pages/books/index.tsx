import { Grid, Container, Text, Flex, Box, Stack, Group, Center, Button } from '@mantine/core'
import BookItem from 'components/Books/BookItem'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import BookService from '@/services/BookService'
import AddButton from 'components/Buttons/AddButton'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import BookCreate from 'components/Books/BookCreate'
import CategoryCreate from 'components/Books/CategoryCreate'
import CSelectSearcheble from 'components/Inputs/CSelectSearcheble'
import CTextInputNew from 'components/Inputs/CTextInputNew'
import { IconSearch } from '@tabler/icons-react'
import { BookFilterType, useBookListStore } from '@/stores/BookListStore'
import CPagination from 'components/CPagination'
import { useCategoryOptionsQuery } from '@/queries/GlobalQueries'

const Books = () => {
	const {
		filter: { title, writer, status, categoryId, page },
		updateFilter,
		resetFilter,
	} = useBookListStore()

	const [debouncedTitle] = useDebouncedValue(title, 300)
	const [debouncedWriter] = useDebouncedValue(writer, 300)

	const [isAddBookModalOpen, bookHandler] = useDisclosure(false)

	const [isCategoryModalOpen, categoryHandler] = useDisclosure(false)

	const { data } = useQuery({
		queryKey: ['books', { title: debouncedTitle, writer: debouncedWriter, status, categoryId, page }],
		queryFn: () => BookService.getBooks({ title: debouncedTitle, writer: debouncedWriter, status, categoryId, page, limit: 12 }),
		placeholderData: keepPreviousData,
	})

	const { data: categoryOptions } = useCategoryOptionsQuery()

	const handleChange = (key: keyof BookFilterType) => (value: string | null) => {
		updateFilter(key, value ?? '')
		updateFilter('page', 1)
	}

	return (
		<Box>
			<Container fluid size='xl' py='md'>
				<Stack gap={20}>
					<Group justify='space-between' align='center'>
						<Text size='xl' fw={700}>
							Books
						</Text>
						<Group gap={10}>
							<AddButton h={40} variant='light' onClick={() => categoryHandler.open()}>
								Add Category
							</AddButton>
							<AddButton h={40} onClick={() => bookHandler.open()}>
								Add Book
							</AddButton>
						</Group>
					</Group>
					<Group gap={20} align='center'>
						<CSelectSearcheble
							withLabel
							label='Status'
							data={[
								{ label: 'All', value: '' },
								{ label: 'Available', value: 'AVAILABLE' },
								{ label: 'Borrowed', value: 'BORROWED' },
							]}
							placeholder='Search by status'
							value={status}
							onChange={handleChange('status')}
						/>
						<CTextInputNew
							withLabel
							label='Title'
							leftSection={<IconSearch stroke={1} />}
							placeholder='Search by title'
							value={title}
							onChange={(e) => handleChange('title')(e.target.value)}
						/>
						<CTextInputNew
							withLabel
							label='Author'
							leftSection={<IconSearch stroke={1} />}
							placeholder='Search by author'
							value={writer}
							onChange={(e) => handleChange('writer')(e.target.value)}
						/>
						<CSelectSearcheble
							withLabel
							label='Search by category'
							data={[{ label: 'All', value: '' }, ...(categoryOptions?.data?.data || [])]}
							placeholder='Search by category'
							value={categoryId}
							onChange={handleChange('categoryId')}
						/>
					</Group>
					<Flex justify='flex-end' align='center'>
						<Button
							variant='light'
							color='gray.6'
							onClick={() => resetFilter()}
							sx={{
								'&:hover': {
									backgroundColor: '#f1f3f5',
								},
							}}>
							Reset Filters
						</Button>
					</Flex>
					{data?.data?.data?.books?.length === 0 ? (
						<Center>
							<Text>No books found</Text>
						</Center>
					) : (
						<Grid>
							{data?.data?.data?.books?.map((book) => (
								<Grid.Col key={book.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
									<BookItem book={book} />
								</Grid.Col>
							))}
						</Grid>
					)}
					<CPagination total={data?.data?.data?.totalPages as number} value={page} onChange={(value) => updateFilter('page', value)} mt='xl' mx='auto' />
				</Stack>
			</Container>

			<BookCreate opened={isAddBookModalOpen} onClose={bookHandler.close} />

			<CategoryCreate opened={isCategoryModalOpen} onClose={categoryHandler.close} />
		</Box>
	)
}

export default Books
