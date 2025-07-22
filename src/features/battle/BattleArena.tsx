import { useState } from 'react'
import { useGetCharactersQuery } from '../characters/charactersApi'
import type { Character } from '../characters/charactersTypes'
import BattleSelector from './BattleSelector'
import BattleCard from './BattleCard'
import BattleResult from './BattleResult'
import { compareKi } from './battleUtils'
import './BattleArena.scss'

export default function BattleArena() {
	// Fetch personajes con RTK Query
	const { data, isLoading, isError } = useGetCharactersQuery({ limit: 100 })
	const characters = data?.items ?? []

	// Estado de la batalla
	const [left, setLeft] = useState<Character | null>(null)
	const [right, setRight] = useState<Character | null>(null)
	const [winner, setWinner] = useState<'left' | 'right' | 'draw' | null>(null)
	const [history, setHistory] = useState<
		{ left: Character; right: Character; winner: string; date: number }[]
	>([])

	// Loader
	if (isLoading) {
		return (
			<section className="battle-arena battle-arena--loading">
				<h2 className="battle-arena__title">Battle Arena</h2>
				<div className="battle-arena__loader">
					<div className="dbz-loader" />
					Cargando luchadores...
				</div>
			</section>
		)
	}

	// Error
	if (isError || !characters.length) {
		return (
			<section className="battle-arena battle-arena--error">
				<h2 className="battle-arena__title">Battle Arena</h2>
				<div className="battle-arena__error">
					❌ Error cargando luchadores. <br />
					Intenta recargar la página o verifica tu conexión.
				</div>
			</section>
		)
	}

	// Lógica de batalla
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
			...h.slice(0, 4), // Solo últimas 5
		])
	}

	const handleReset = () => {
		setWinner(null)
		setLeft(null)
		setRight(null)
	}

	// Render principal
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
						characters={characters}
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
