import './BattleCard.scss'
import type { Character } from '../characters/charactersTypes'
import { parseKi } from './battleUtils'

interface Props {
	character: Character | null
	side: 'left' | 'right'
	highlight?: boolean
}

export default function BattleCard({ character, side, highlight }: Props) {
	if (!character) {
		return (
			<div
				className={`battle-card battle-card--empty battle-card--${side}`}>
				<span>Selecciona un luchador</span>
			</div>
		)
	}

	const ki = parseKi(character.ki)
	const maxKi = parseKi(character.maxKi)
	const powerPercent = maxKi
		? Math.min(100, Math.round((ki / maxKi) * 100))
		: 0

	return (
		<div
			className={`battle-card battle-card--${side}${
				highlight ? ' battle-card--winner' : ''
			}`}>
			<div className="battle-card__image">
				<img src={character.image} alt={character.name} />
			</div>
			<div className="battle-card__info">
				<div className="battle-card__name">{character.name}</div>
				<div className="battle-card__meta">
					<span>{character.race}</span>
					<span>{character.affiliation}</span>
				</div>
				<div className="battle-card__ki">
					<b>Ki:</b> {character.ki}
				</div>
				<div className="battle-card__maxki">
					<b>MaxKi:</b> {character.maxKi}
				</div>
				<div className="battle-card__powerbar">
					<div
						className="battle-card__powerbar-fill"
						style={{ width: `${powerPercent}%` }}
						title={`${powerPercent}% poder actual`}
					/>
				</div>
			</div>
			{highlight && <div className="battle-card__winner">🏆</div>}
		</div>
	)
}
