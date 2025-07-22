import './CharacterCard.scss'
import type { Character } from './charactersTypes'

interface Props {
	character: Character
	onClick?: (id: number) => void
}

const CharacterCard = ({ character, onClick }: Props) => (
	<button
		className="character-card"
		tabIndex={0}
		onClick={() => onClick?.(character.id)}
		aria-label={character.name}
		type="button">
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
					<span className="character-card__affiliation">
						{character.affiliation}
					</span>
					<span className="character-card__race">
						{character.race}
					</span>
				</div>
				<div className="character-card__stats">
					<span>
						<b>Ki</b>:{' '}
						<span className="character-card__stat-value">
							{character.ki}
						</span>
					</span>
					<span>
						<b>MaxKi</b>:{' '}
						<span className="character-card__stat-value">
							{character.maxKi}
						</span>
					</span>
					<span>
						<b>
							{character.gender === 'Male'
								? '♂️'
								: character.gender === 'Female'
								? '♀️'
								: '⚪'}
						</b>
					</span>
				</div>
				<p className="character-card__desc">
					{character.description.length > 120
						? character.description.slice(0, 110) + '…'
						: character.description}
				</p>
			</div>
		</div>
	</button>
)

export default CharacterCard
