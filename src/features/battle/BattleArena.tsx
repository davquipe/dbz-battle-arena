import { useState } from 'react'
import { useGetCharactersQuery } from '../characters/charactersApi'
import type { Character } from '../characters/charactersTypes'
import BattleSelector from './BattleSelector'
import BattleCard from './BattleCard'
import BattleResult from './BattleResult'
import ArenaStage from './ArenaStage'
import { compareKi } from './battleUtils'
import './BattleArena.scss'

export default function BattleArena() {
	const { data, isLoading, isError } = useGetCharactersQuery({ limit: 100 })
	const characters = data?.items ?? []

	const [left, setLeft] = useState<Character | null>(null)
	const [right, setRight] = useState<Character | null>(null)
	const [winner, setWinner] = useState<'left' | 'right' | 'draw' | null>(null)
	const [history, setHistory] = useState<
		{ left: Character; right: Character; winner: string; date: number }[]
	>([])

	if (isLoading) {
		return (
			<div className="battle-arena-wrapper">
				<ArenaStage />
				<section className="battle-arena battle-arena--loading">
					<h2 className="battle-arena__title">Battle Arena</h2>
					<div className="battle-arena__loader">
						<div className="battle-arena__spinner" />
						Cargando luchadores...
					</div>
				</section>
			</div>
		)
	}
	if (isError || !characters.length) {
		return (
			<div className="battle-arena-wrapper">
				<ArenaStage />
				<section className="battle-arena battle-arena--error">
					<h2 className="battle-arena__title">Battle Arena</h2>
					<div className="battle-arena__error">
						❌ Error cargando luchadores. <br />
						Intenta recargar la página o verifica tu conexión.
					</div>
				</section>
			</div>
		)
	}

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
			...h.slice(0, 4),
		])
	}

	const handleReset = () => {
		setWinner(null)
		setLeft(null)
		setRight(null)
	}

	return (
		<div className="battle-arena-wrapper">
			<ArenaStage />
			<section className="battle-arena">
				<h2 className="battle-arena__title">Battle Arena</h2>
				<div className="battle-arena__main">
					<div className="battle-arena__side">
						<BattleSelector
							value={left}
							onChange={setLeft}
							label="Luchador 1"
							exclude={right?.id}
							characters={characters}
						/>
						<BattleCard
							character={left}
							side="left"
							highlight={winner === 'left'}
						/>
					</div>
					<div className="battle-arena__vs">VS</div>
					<div className="battle-arena__side">
						<BattleSelector
							value={right}
							onChange={setRight}
							label="Luchador 2"
							exclude={left?.id}
							characters={characters}
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
						className="battle-arena__btn battle-arena__btn--fight"
						disabled={!left || !right || !!winner}
						onClick={handleFight}>
						¡Pelear!
					</button>
					<button
						className="battle-arena__btn battle-arena__btn--reset"
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
						<h4 className="battle-arena__history-title">
							Historial de Batallas
						</h4>
						<ul className="battle-arena__history-list">
							{history.map((b, i) => (
								<li
									className="battle-arena__history-item"
									key={b.date + i}>
									<b>{b.left.name}</b> VS{' '}
									<b>{b.right.name}</b> →{' '}
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
		</div>
	)
}
