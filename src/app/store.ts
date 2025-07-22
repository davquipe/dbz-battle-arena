import { configureStore } from '@reduxjs/toolkit'
import battleReducer from '../features/battle/battleSlice'
import charactersReducer from '../features/characters/charactersSlice'
import { api } from '../api/api'

export const store = configureStore({
	reducer: {
		characters: charactersReducer,
		battle: battleReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
	devTools: import.meta.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
