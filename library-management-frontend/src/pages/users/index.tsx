import { User } from '@/lib/types'
import UserService from '@/services/UserService'
import { UserFilterType, useUserListStore } from '@/stores/UserListStore'
import { Grid, Stack, Container, Text, Flex, Box } from '@mantine/core'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AddButton from 'components/Buttons/AddButton'
import CPagination from 'components/CPagination'
import CTextInputNew from 'components/Inputs/CTextInputNew'
import UserCreate from 'components/User/UserCreate'
import UserItem from 'components/User/UserItem'
import { useEffect } from 'react'

const Users = () => {
	const [isAddUserModalOpen, userHandler] = useDisclosure(false)
	const {
		filter: { name, page },
		updateFilter,
	} = useUserListStore()

	const [debouncedName] = useDebouncedValue(name, 400)

	const { data } = useQuery({
		queryKey: ['user-list', { name: debouncedName, page }],
		queryFn: () => UserService.getUsers({ name: debouncedName, page }),
		placeholderData: keepPreviousData,
	})

	const handleChange = (key: keyof UserFilterType) => (value: string | null) => {
		updateFilter(key, value ?? '')
	}

	useEffect(() => {
		updateFilter('page', 1)
	}, [debouncedName])

	return (
		<Box>
			<Container fluid size='xl' py='md'>
				<Stack gap={20}>
					<Flex justify='space-between' align='center'>
						<Text component='h1' size='xl' fw={700}>
							Users
						</Text>
						<AddButton onClick={() => userHandler.open()}>Add User</AddButton>
					</Flex>
					<CTextInputNew maw={240} placeholder='Search by name' value={name} onChange={(e) => handleChange('name')(e.target.value)} />
					<Grid>
						{data?.data?.data?.users?.map((user: User) => (
							<Grid.Col key={user?.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
								<UserItem id={user?.id} name={user?.name} pastBorrows={user?.pastBorrows?.length || 0} currentBorrows={user?.currentBorrows?.length || 0} />
							</Grid.Col>
						))}
					</Grid>
					<CPagination total={data?.data?.data?.totalPages} value={page} onChange={(value) => updateFilter('page', value)} mx='auto' />
				</Stack>
				<UserCreate opened={isAddUserModalOpen} onClose={userHandler.close} />
			</Container>
		</Box>
	)
}

export default Users
