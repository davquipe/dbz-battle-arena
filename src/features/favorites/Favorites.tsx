import { useFavorites } from './useFavorites'
import CharacterCard from '../characters/CharacterCard'
import './Favorites.scss'

export default function Favorites() {
	const { favorites, removeFavorite } = useFavorites()

	return (
		<section className="favorites">
			<h2 className="favorites__title">⭐ Tus Favoritos</h2>
			{favorites.length === 0 ? (
				<div className="favorites__empty">
					¡Aún no tienes personajes favoritos! 💔
				</div>
			) : (
				<div className="favorites__grid">
					{favorites.map((char) => (
						<div className="favorites__item" key={char.id}>
							<CharacterCard character={char} />
							<button
								className="favorites__remove"
								onClick={() => removeFavorite(char.id)}
								aria-label="Eliminar de favoritos">
								×
							</button>
						</div>
					))}
				</div>
			)}
		</section>
	)
}
