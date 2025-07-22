import { useState } from 'react'
import { useGetCharactersQuery } from './charactersApi'
import CharacterCard from './CharacterCard'
import './Characters.scss'
import { useNavigate } from 'react-router-dom'

const Characters = () => {
	const [page, setPage] = useState(1)
	const { data, isLoading, error } = useGetCharactersQuery({
		page,
		limit: 24,
	})

	const navigate = useNavigate()

	if (isLoading)
		return <div className="characters__loading">Cargando personajes…</div>
	if (error)
		return (
			<div className="characters__error">Error al cargar personajes</div>
		)

	return (
		<section className="characters">
			<h2 className="characters__title">Personajes</h2>
			<div className="characters__grid">
				{data?.items.map((char) => (
					<CharacterCard
						key={char.id}
						character={char}
						onClick={() => navigate(`/characters/${char.id}`)}
					/>
				))}
			</div>
			<div className="characters__pagination">
				<button onClick={() => setPage(page - 1)} disabled={page <= 1}>
					Anterior
				</button>
				<span>
					Página {page} de {data?.meta.totalPages}
				</span>
				<button
					onClick={() => setPage(page + 1)}
					disabled={page >= (data?.meta.totalPages ?? 1)}>
					Siguiente
				</button>
			</div>
		</section>
	)
}

export default Characters
