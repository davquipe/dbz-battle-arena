import { configureStore } from '@reduxjs/toolkit'
import battleReducer from '../features/battle/battleSlice'
import charactersReducer from '../features/characters/charactersSlice'
// import historyReducer from '../features/history/historySlice'
// import favoritesReducer from '../features/favorites/favoritesSlice'

export const store = configureStore({
	reducer: {
		characters: charactersReducer,
		battle: battleReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
