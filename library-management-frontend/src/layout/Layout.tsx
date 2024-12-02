import { AppShell, Box, Burger, Center, Drawer, Image, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Sidebar } from './Sidebar'
import BackButton from 'components/Buttons/BackButton'
import { NavLink } from 'react-router-dom'

function Layout({ children }: { children: React.ReactNode }) {
	const [opened, { toggle, close }] = useDisclosure()

	return (
		<AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: true } }} padding='md'>
			<AppShell.Header>
				<Box h={60} px='md'>
					<Burger pos='absolute' left={20} top={16} opened={opened} onClick={toggle} hiddenFrom='md' size='sm' />
					<Drawer opened={opened} onClose={close} size='xs' hiddenFrom='md' styles={{ body: { padding: 0 } }}>
						<Box p='md'>
							<Sidebar />
						</Box>
					</Drawer>
					<Box component={NavLink} to='users' hiddenFrom='md' pos='absolute' right={20} top={0}>
						<Center style={{ borderBottom: '1px solid #F0F0F0' }}>
							<Image src='/libraryLogoo.png' width={70} height={70} fit='contain' />
						</Center>
					</Box>
				</Box>
			</AppShell.Header>
			<AppShell.Navbar>
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>
				<Box p='md' bg='#f8f9fa'>
					<Stack gap='md'>
						<BackButton />
						{children}
					</Stack>
				</Box>
			</AppShell.Main>
		</AppShell>
	)
}

export default Layout
