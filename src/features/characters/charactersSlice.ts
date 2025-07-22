import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CharactersState } from './charactersTypes'
import type { CharactersResponse } from '../../types/character'

const initialState: CharactersState = {
	items: [],
	status: 'idle',
	error: null,
	meta: null,
	links: null,
	page: 1,
}

export const fetchCharacters = createAsyncThunk<
	CharactersResponse,
	number | undefined
>('characters/fetchCharacters', async (page = 1) => {
	const res = await fetch(
		`${import.meta.env.VITE_APP_DBZ_API_URL}/characters?page=${page}`,
	)
	if (!res.ok) throw new Error('Error al obtener personajes')
	return await res.json()
})

const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCharacters.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchCharacters.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload.items
				state.meta = action.payload.meta
				state.links = action.payload.links
			})
			.addCase(fetchCharacters.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message ?? 'Error desconocido'
			})
	},
})

export const { setPage } = charactersSlice.actions
export default charactersSlice.reducer
