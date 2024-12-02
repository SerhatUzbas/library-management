import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type BookFilterType = {
	title: string
	status: 'AVAILABLE' | 'BORROWED' | ''
	categoryId: string
	writer: string
	page: number
}

export const INITIAL_FILTER: BookFilterType = {
	title: '',
	status: '',
	categoryId: '',
	writer: '',
	page: 1,
}

interface BookListStoreState {
	filter: BookFilterType
	updateFilter: <K extends keyof BookFilterType>(key: K, value: BookFilterType[K]) => void
	resetFilter: () => void
}

export const useBookListStore = create<BookListStoreState>()(
	devtools(
		immer((set) => ({
			filter: INITIAL_FILTER,
			updateFilter: (key, value) =>
				set((state) => {
					state.filter[key] = value
				}),
			resetFilter: () =>
				set((state) => {
					state.filter = INITIAL_FILTER
				}),
		})),

		{ name: 'BookListStore', anonymousActionType: 'app' }
	)
)
