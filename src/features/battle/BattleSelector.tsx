import React, { useState, useRef, useEffect } from 'react'
import type { Character } from '../characters/charactersTypes'
import './BattleSelector.scss'

interface BattleSelectorProps {
	value: Character | null
	onChange: (char: Character) => void
	label: string
	exclude?: number
	characters?: Character[] // pásale por props o consúmelos vía RTK si prefieres
}

const BattleSelector: React.FC<BattleSelectorProps> = ({
	value,
	onChange,
	label,
	exclude,
	characters = [],
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState('')
	const ref = useRef<HTMLDivElement>(null)

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		if (!isOpen) return
		const handle = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handle)
		return () => document.removeEventListener('mousedown', handle)
	}, [isOpen])

	// Filtro de personajes
	const filtered = characters
		.filter((c) => !exclude || c.id !== exclude)
		.filter((c) =>
			c.name.toLowerCase().includes(search.trim().toLowerCase()),
		)

	return (
		<div className="battle-selector" ref={ref}>
			<label className="battle-selector__label">{label}</label>

			{/* Si no hay seleccionado, o abres el dropdown */}
			{!value || isOpen ? (
				<div className="battle-selector__dropdown-wrap">
					<input
						className="battle-selector__input"
						placeholder="Buscar luchador..."
						autoFocus={isOpen}
						value={search}
						onFocus={() => setIsOpen(true)}
						onChange={(e) => setSearch(e.target.value)}
					/>
					{isOpen && (
						<ul className="battle-selector__dropdown">
							{filtered.length === 0 && (
								<li className="battle-selector__empty">
									Sin resultados
								</li>
							)}
							{filtered.map((char) => (
								<li
									key={char.id}
									className="battle-selector__item"
									onClick={() => {
										onChange(char)
										setIsOpen(false)
										setSearch('')
									}}
									tabIndex={0}>
									<img
										src={char.image}
										alt={char.name}
										className="battle-selector__avatar"
									/>
									<span className="battle-selector__name">
										{char.name}
									</span>
									<span
										className={`battle-selector__race battle-selector__race--${char.race.toLowerCase()}`}>
										{char.race}
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
			) : (
				<div className="battle-selector__selected">
					<img
						src={value.image}
						alt={value.name}
						className="battle-selector__avatar"
					/>
					<span className="battle-selector__name">{value.name}</span>
					<button
						className="battle-selector__change"
						onClick={() => setIsOpen(true)}
						type="button"
						title="Cambiar luchador"
						aria-label="Cambiar luchador">
						✏️ Cambiar
					</button>
				</div>
			)}
		</div>
	)
}

export default BattleSelector
