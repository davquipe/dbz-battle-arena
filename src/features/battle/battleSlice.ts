import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { BattleState } from './battleTypes'
import type { Character } from '../../types/character'

const initialState: BattleState = {
	fighterA: null,
	fighterB: null,
	winner: null,
	status: 'idle',
	history: [],
}

const battleSlice = createSlice({
	name: 'battle',
	initialState,
	reducers: {
		selectFighterA(state, action: PayloadAction<Character>) {
			state.fighterA = action.payload
		},
		selectFighterB(state, action: PayloadAction<Character>) {
			state.fighterB = action.payload
		},
		setWinner(state, action: PayloadAction<Character>) {
			state.winner = action.payload
			state.status = 'finished'
			// Push al historial
			if (state.fighterA && state.fighterB) {
				state.history.unshift({
					fighterA: state.fighterA,
					fighterB: state.fighterB,
					winner: action.payload,
					timestamp: new Date().toISOString(),
				})
			}
		},
		startBattle(state) {
			state.status = 'in-progress'
			state.winner = null
		},
		resetBattle(state) {
			state.fighterA = null
			state.fighterB = null
			state.winner = null
			state.status = 'idle'
		},
	},
})

export const {
	selectFighterA,
	selectFighterB,
	setWinner,
	startBattle,
	resetBattle,
} = battleSlice.actions
export default battleSlice.reducer
