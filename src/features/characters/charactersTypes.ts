export interface Character {
	id: number
	name: string
	ki: string
	maxKi: string
	race: string
	gender: string
	description: string
	image: string
	affiliation: string
	deletedAt: string | null
}

export interface CharactersResponse {
	items: Character[]
	meta: {
		totalItems: number
		itemCount: number
		itemsPerPage: number
		totalPages: number
		currentPage: number
	}
	links: {
		first: string
		previous: string
		next: string
		last: string
	}
}

export interface Transformation {
	id: number
	name: string
	image?: string
	ki?: string
	deletedAt?: string | null
}

export interface OriginPlanet {
	id: number
	name: string
	isDestroyed?: boolean
	description?: string
	image?: string
	deletedAt?: string | null
}

export interface CharacterDetail {
	id: number
	name: string
	ki?: string
	maxKi?: string
	race?: string
	gender?: string
	description?: string
	image?: string
	affiliation?: string
	deletedAt?: string | null
	originPlanet?: OriginPlanet
	transformations?: Transformation[]
}
