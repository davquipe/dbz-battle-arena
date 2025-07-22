import type { Character, CharactersResponse } from '../../types/character'

export interface CharactersState {
	items: Character[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	meta: CharactersResponse['meta'] | null
	links: CharactersResponse['links'] | null
	page: number
}
