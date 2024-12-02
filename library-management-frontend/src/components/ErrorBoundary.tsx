import { Center, Flex, Stack, Text } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'

import { useEffect } from 'react'
import { useRouteError } from 'react-router-dom'

const CErrorBoundary = () => {
	const error = useRouteError()
	console.error(error)

	useEffect(() => {
		// const timeout = setTimeout(() => window.location.reload(), 2000)
		// return () => clearTimeout(timeout)
	}, [])

	return (
		<Center
			w='100vw'
			h='100vh'
			style={{
				background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(121,9,18,1) 35%, rgba(0,212,255,1) 100%)',
			}}>
			<Stack gap={20} align='center' c='#fff'>
				<Text fz={22}>Something happened we did not expect!</Text>
				<Flex gap={10} align='center'>
					<Text fz={12}>Redirecting...</Text>
					<IconHeart stroke={1} />
				</Flex>
			</Stack>
		</Center>
	)
}

export default CErrorBoundary
