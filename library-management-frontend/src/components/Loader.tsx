import { LoadingOverlay } from '@mantine/core'

const Loader = () => {
	return <LoadingOverlay loaderProps={{ color: 'red.6' }} visible overlayProps={{ blur: 2 }} w='100%' />
}

export default Loader
