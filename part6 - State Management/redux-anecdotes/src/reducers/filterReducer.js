import { createSlice } from '@reduxjs/toolkit'

const filterDefault = 'ALL'

const filterSlice = createSlice({

	name: 'filter',
	initialState: filterDefault,
	reducers: {

		filterWith(state, action) {

			return action.payload
		},

		resetFilter(state, action) {

			return filterDefault
		}
	}
})


export const { filterWith, resetFilter } = filterSlice.actions
export default filterSlice.reducer