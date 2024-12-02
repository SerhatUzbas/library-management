import { Select, SelectProps } from '@mantine/core'
import classes from './Inputs.module.css'

const CSelect = ({ allowDeselect = false, ...props }: SelectProps) => {
	return (
		<Select
			withCheckIcon={false}
			classNames={{
				input: classes.input,
				dropdown: classes.selectDropdown,
				option: classes.selectOption,
				label: classes.label,
			}}
			allowDeselect={allowDeselect}
			{...props}
		/>
	)
}

export default CSelect
