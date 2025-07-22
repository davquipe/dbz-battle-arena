import { useEffect, useState } from 'react'
import type { Character } from '../characters/charactersTypes'

const STORAGE_KEY = 'dbz_favorites'

export function useFavorites() {
	const [favorites, setFavorites] = useState<Character[]>([])

	useEffect(() => {
		const favs = localStorage.getItem(STORAGE_KEY)
		if (favs) setFavorites(JSON.parse(favs))
	}, [])

	const saveFavorites = (newFavs: Character[]) => {
		setFavorites(newFavs)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
	}

	const addFavorite = (char: Character) => {
		if (!favorites.find((f) => f.id === char.id)) {
			const newFavs = [char, ...favorites]
			saveFavorites(newFavs)
		}
	}

	const removeFavorite = (id: number) => {
		const newFavs = favorites.filter((f) => f.id !== id)
		saveFavorites(newFavs)
	}

	return { favorites, addFavorite, removeFavorite }
}
