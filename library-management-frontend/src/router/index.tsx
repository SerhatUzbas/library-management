import { lazy } from 'react'
import { Navigate, NonIndexRouteObject, Outlet, createBrowserRouter } from 'react-router-dom'

import { IconBooks, IconUsers } from '@tabler/icons-react'

const ErrorBoundary = lazy(() => import('../components/ErrorBoundary'))

const Layout = lazy(() => import('../layout/Layout'))

const Users = lazy(() => import('../pages/users'))

const UserDetail = lazy(() => import('../pages/users/userDetail'))

const Books = lazy(() => import('../pages/books'))

const BookDetail = lazy(() => import('../pages/books/bookDetail'))

export interface Route extends NonIndexRouteObject {
	title?: string
	children?: Route[]
	path: string
	icon?: React.ReactNode
	inMenu?: boolean
}
export const useLibraryManagementRoutes = () => {
	const routes: Route[] = [
		{
			path: '/',
			element: (
				<Layout>
					<Outlet />
				</Layout>
			),
			errorElement: <ErrorBoundary />,
			children: [
				{
					path: '',
					element: <Navigate to='/books' />,
					inMenu: false,
				},

				{
					path: 'books',
					title: 'Books',
					icon: <IconBooks />,
					element: <Outlet />,
					inMenu: true,
					children: [
						{
							path: '',
							title: 'Books',
							icon: <IconBooks />,
							element: <Books />,
							inMenu: true,
						},

						{
							path: ':id',
							title: 'Book Detail',
							icon: <IconBooks />,
							element: <BookDetail />,
							inMenu: false,
						},
					],
				},

				{
					path: 'users',
					title: 'Users',
					icon: <IconUsers />,
					element: <Outlet />,
					inMenu: true,
					children: [
						{
							path: '',
							title: 'Users',
							icon: <IconUsers />,
							element: <Users />,
							inMenu: true,
						},

						{
							path: ':id',
							title: 'User Detail',
							icon: <IconUsers />,
							element: <UserDetail />,
							inMenu: false,
						},
					],
				},

				{
					path: '*',
					element: <Navigate to='/' />,
				},
			],
		},
	]
	return routes
}

const Router = () => createBrowserRouter(useLibraryManagementRoutes())

export default Router
