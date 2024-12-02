import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type UserFilterType = {
	name: string
	page: number
}

export const INITIAL_FILTER: UserFilterType = {
	name: '',
	page: 1,
}

interface UserListStoreState {
	filter: UserFilterType
	updateFilter: <K extends keyof UserFilterType>(key: K, value: UserFilterType[K]) => void
}

export const useUserListStore = create<UserListStoreState>()(
	devtools(
		immer((set) => ({
			filter: INITIAL_FILTER,
			updateFilter: (key, value) =>
				set((state) => {
					state.filter[key] = value
				}),
		})),

		{ name: 'UserListStore', anonymousActionType: 'app' }
	)
)
