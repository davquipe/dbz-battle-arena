import { useState } from 'react'
import BattleCard from './BattleCard'
import BattleResult from './BattleResult'
import type { Character } from '../characters/charactersTypes'
import './BattleArena.scss'
import BattleSelector from './BattleSelector'
import { compareKi } from './battleUtils'

export default function BattleArena() {
	const [left, setLeft] = useState<Character | null>(null)
	const [right, setRight] = useState<Character | null>(null)
	const [winner, setWinner] = useState<'left' | 'right' | 'draw' | null>(null)
	const [history, setHistory] = useState<
		{ left: Character; right: Character; winner: string; date: number }[]
	>([])

	const handleFight = () => {
		if (!left || !right) return
		const cmp = compareKi(left.maxKi, right.maxKi)
		let win: 'left' | 'right' | 'draw'
		if (cmp > 0) win = 'left'
		else if (cmp < 0) win = 'right'
		else win = 'draw'
		setWinner(win)
		setHistory((h) => [
			{ left, right, winner: win, date: Date.now() },
			...h.slice(0, 2),
		])
	}

	const handleReset = () => {
		setWinner(null)
		setLeft(null)
		setRight(null)
	}

	return (
		<section className="battle-arena">
			<h2 className="battle-arena__title">Battle Arena</h2>
			<div className="battle-arena__main">
				{/* Lado Izquierdo */}
				<div className="battle-arena__side">
					<BattleSelector
						value={left}
						onChange={setLeft}
						label="Luchador 1"
						exclude={right?.id}
					/>
					<BattleCard
						character={left}
						side="left"
						highlight={winner === 'left'}
					/>
				</div>

				{/* VS */}
				<div className="battle-arena__vs">VS</div>

				{/* Lado Derecho */}
				<div className="battle-arena__side">
					<BattleSelector
						value={right}
						onChange={setRight}
						label="Luchador 2"
						exclude={left?.id}
					/>
					<BattleCard
						character={right}
						side="right"
						highlight={winner === 'right'}
					/>
				</div>
			</div>

			<div className="battle-arena__actions">
				<button
					className="battle-arena__fight"
					disabled={!left || !right || !!winner}
					onClick={handleFight}>
					¡Pelear!
				</button>
				<button
					className="battle-arena__reset"
					onClick={handleReset}
					disabled={!winner && !left && !right}>
					Resetear
				</button>
			</div>

			{winner && (
				<BattleResult left={left} right={right} winner={winner} />
			)}

			{history.length > 0 && (
				<div className="battle-arena__history">
					<h4>Historial de Batallas</h4>
					<ul>
						{history.map((b, i) => (
							<li key={b.date + i}>
								<b>{b.left.name}</b> VS <b>{b.right.name}</b> →{' '}
								<span>
									{b.winner === 'left'
										? b.left.name + ' ganó'
										: b.winner === 'right'
										? b.right.name + ' ganó'
										: 'Empate'}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	)
}
