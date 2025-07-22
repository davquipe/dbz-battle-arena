import { useState } from 'react'
import { useGetCharactersQuery } from '../characters/charactersApi'
import type { Character } from '../characters/charactersTypes'
import './BattleSelector.scss'

interface Props {
	value: Character | null
	onChange: (c: Character | null) => void
	label: string
	exclude?: number // Para no seleccionar al mismo dos veces
}

export default function BattleSelector({
	value,
	onChange,
	label,
	exclude,
}: Props) {
	const [search, setSearch] = useState('')
	const { data, isLoading } = useGetCharactersQuery({
		page: 1,
		limit: 100,
		search,
	})

	const items = (data?.items ?? []).filter(
		(c) => !exclude || c.id !== exclude,
	)

	return (
		<div className="battle-selector">
			<label className="battle-selector__label">{label}</label>
			<input
				className="battle-selector__input"
				placeholder="Buscar luchador…"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				autoComplete="off"
			/>
			<div className="battle-selector__dropdown">
				{isLoading ? (
					<div className="battle-selector__loading">Cargando…</div>
				) : items.length === 0 ? (
					<div className="battle-selector__empty">Sin resultados</div>
				) : (
					<ul>
						{items.slice(0, 8).map((c) => (
							<li
								key={c.id}
								className={`battle-selector__option${
									value?.id === c.id ? ' is-selected' : ''
								}`}
								onClick={() => {
									onChange(c)
									setSearch('')
								}}
								tabIndex={0}
								onKeyDown={(e) =>
									e.key === 'Enter'
										? (onChange(c), setSearch(''))
										: undefined
								}>
								<img
									src={c.image}
									alt={c.name}
									width={30}
									height={30}
								/>
								<span>{c.name}</span>
								<span className="battle-selector__race">
									{c.race}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>
			{value && (
				<button
					className="battle-selector__clear"
					onClick={() => onChange(null)}
					title="Quitar selección">
					✕
				</button>
			)}
		</div>
	)
}
