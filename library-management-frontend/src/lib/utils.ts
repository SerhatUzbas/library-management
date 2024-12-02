export const getInitials = (name: string) => {
	const nameSplit = name.split(' ')
	if (nameSplit.length === 1) return `${nameSplit[0][0]}`
	const firstName = nameSplit[0]
	const lastName = nameSplit[nameSplit.length - 1]
	return `${firstName[0]}${lastName[0]}`
}
