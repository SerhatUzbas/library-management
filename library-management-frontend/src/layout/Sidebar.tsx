import { Stack, Image, Center, Box, Text, Flex } from '@mantine/core'
import { NavLink, useLocation } from 'react-router-dom'
import { useLibraryManagementRoutes } from '@/router'

export const Sidebar = () => {
	const routes = useLibraryManagementRoutes()
	const { pathname } = useLocation()

	const links = routes[0].children?.map((link, index) => {
		if (link.inMenu === false) return

		const isActive = pathname.includes(link.path)
		return <NavbarLink key={index} href={link.path} label={link.title as string} icon={link.icon} active={isActive} />
	})
	return (
		<Box>
			<Stack
				pb={10}
				h='100vh'
				w={300}
				miw={300}
				style={{
					borderRight: '1px solid #ececec',
					position: 'relative',
				}}>
				<NavLink to='users'>
					<Center style={{ borderBottom: '1px solid #F0F0F0' }}>
						<Image src='/libraryLogoo.png' width={200} height={200} fit='contain' />
					</Center>
				</NavLink>

				<Center style={{ overflowY: 'scroll' }}>
					<Box w='100%' h='100%' mx={20}>
						{links}
					</Box>
				</Center>
			</Stack>
		</Box>
	)
}

const NavbarLink = ({ href, label, icon, active }: { active: boolean; href: string; label: string; icon: React.ReactNode }) => {
	return (
		<Box
			component={NavLink}
			to={href}
			style={{
				textDecoration: 'none',
				color: active ? '#68A3FC' : '#000',
				fontWeight: active ? 700 : 500,
			}}>
			<Flex align='center' gap={10} p={10} bg={active ? '#68A3FC70' : 'inherit'} style={{ borderRadius: 12 }}>
				{icon}
				<Text>{label}</Text>
			</Flex>
		</Box>
	)
}
