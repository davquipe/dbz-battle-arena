import { useFavorites } from '../favorites/useFavorites'
import './CharacterCard.scss'
import type { Character } from './charactersTypes'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
	character: Character
	onClick?: (id: number) => void
}

const CharacterCard = ({ character, onClick }: Props) => {
	const { favorites, addFavorite, removeFavorite } = useFavorites()
	const isFav = favorites.some((f) => f.id === character.id)

	const handleFavClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (isFav) removeFavorite(character.id)
		else addFavorite(character)
	}

	return (
		<button
			className={`character-card${
				isFav ? ' character-card--favorite' : ''
			}`}
			tabIndex={0}
			onClick={() => onClick?.(character.id)}
			aria-label={character.name}
			type="button">
			<div className="character-card__fav-wrapper">
				<motion.button
					className="character-card__fav-btn"
					type="button"
					tabIndex={-1}
					onClick={handleFavClick}
					aria-label={
						isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'
					}
					whileTap={{ scale: 0.85, rotate: -10 }}
					animate={isFav ? { scale: 1.1 } : { scale: 1 }}
					transition={{ type: 'spring', duration: 0.35 }}>
					<motion.span
						className="character-card__fav-star"
						animate={
							isFav
								? { color: '#ffe759', scale: [1, 1.15, 1] }
								: { color: '#fff', scale: 1 }
						}>
						★
					</motion.span>
					<AnimatePresence>
						{isFav && (
							<motion.span
								className="character-card__fav-glow"
								initial={{ opacity: 0, scale: 0.7 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.7 }}
								transition={{ duration: 0.45 }}
							/>
						)}
					</AnimatePresence>
				</motion.button>
			</div>
			<div className="character-card__glass">
				<div className="character-card__img">
					<img
						src={character.image}
						alt={character.name}
						loading="lazy"
					/>
				</div>
				<div className="character-card__body">
					<h3 className="character-card__name">{character.name}</h3>
					<div className="character-card__meta">
						{character.affiliation && (
							<span className="character-card__chip character-card__chip--aff">
								{character.affiliation}
							</span>
						)}
						{character.race && (
							<span className="character-card__chip character-card__chip--race">
								{character.race}
							</span>
						)}
					</div>
					<div className="character-card__stats">
						{character.ki && (
							<span>
								<b>Ki</b>:{' '}
								<span className="character-card__stat-value">
									{character.ki}
								</span>
							</span>
						)}
						{character.maxKi && (
							<span>
								<b>MaxKi</b>:{' '}
								<span className="character-card__stat-value">
									{character.maxKi}
								</span>
							</span>
						)}
						{character.gender && (
							<span>
								<b>
									{character.gender === 'Male'
										? '♂️'
										: character.gender === 'Female'
										? '♀️'
										: '⚪'}
								</b>
							</span>
						)}
					</div>
					{character.description && (
						<p className="character-card__desc">
							{character.description.length > 120
								? character.description.slice(0, 110) + '…'
								: character.description}
						</p>
					)}
				</div>
			</div>
		</button>
	)
}

export default CharacterCard
