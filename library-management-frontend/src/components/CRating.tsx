import { Rating, RatingProps } from '@mantine/core'

const CRating = ({ ...props }: RatingProps) => {
	return (
		<div>
			<Rating defaultValue={3} {...props} />
		</div>
	)
}

export default CRating
