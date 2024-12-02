import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { LoadingOverlay } from '@mantine/core'
import Router from './router'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { MantineEmotionProvider, emotionTransform } from '@mantine/emotion'

const App = () => {
	return (
		<MantineProvider
			stylesTransform={emotionTransform}
			theme={{
				breakpoints: {
					xs: '23.5em',
					sm: '36em',
					md: '62.5625em',
					lg: '85.375em',
					xl: '120em',
				},
			}}>
			<MantineEmotionProvider>
				<Notifications position='top-right' />
				<Suspense fallback={<LoadingOverlay visible />}>
					<RouterProvider router={Router()} />
				</Suspense>
			</MantineEmotionProvider>
		</MantineProvider>
	)
}

export default App
