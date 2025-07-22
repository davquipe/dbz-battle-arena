import type { Character } from '../../types/character'

export interface BattleState {
	fighterA: Character | null
	fighterB: Character | null
	winner: Character | null
	status: 'idle' | 'in-progress' | 'finished'
	history: {
		fighterA: Character
		fighterB: Character
		winner: Character
		timestamp: string
	}[]
}
