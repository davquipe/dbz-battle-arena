import { useNavigate, useParams } from 'react-router-dom'
import './CharacterDetail.scss'
import { useGetCharacterByIdQuery } from '../characters/charactersApi'
import { motion } from 'framer-motion'

export default function CharacterDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isError } = useGetCharacterByIdQuery(id as string)

	if (isLoading) {
		return (
			<section className="character-detail character-detail--loading">
				<div className="character-detail__container">
					<div className="character-detail__avatar skeleton" />
					<div className="character-detail__info">
						<div className="character-detail__name skeleton" />
						<div className="character-detail__meta skeleton" />
						<div className="character-detail__desc skeleton" />
					</div>
				</div>
			</section>
		)
	}

	if (isError || !data) {
		return (
			<section className="character-detail character-detail--error">
				<motion.div
					className="character-detail__container"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, type: 'spring' }}>
					<motion.div
						className="character-detail__error-dragonball"
						initial={{ scale: 0.7, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							duration: 0.6,
							type: 'spring',
							delay: 0.12,
						}}>
						<div className="dragonball-epic">
							<span className="dragonball-epic__star" />
							<span className="dragonball-epic__star" />
							<span className="dragonball-epic__star" />
							<span className="dragonball-epic__star" />
						</div>
						<div className="dragonball-epic__glow" />
					</motion.div>
					<motion.h2
						className="character-detail__error-title"
						initial={{ opacity: 0, y: 22 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.19 }}>
						¡Personaje no encontrado!
					</motion.h2>
					<p className="character-detail__error-msg">
						No pudimos encontrar este guerrero en el universo de
						Dragon Ball.
						<br />
						Quizá fue eliminado por Zeno Sama o se esconde en otro
						universo...
					</p>
					<button
						className="character-detail__back"
						onClick={() => navigate(-1)}
						type="button">
						← Volver a personajes
					</button>
				</motion.div>
			</section>
		)
	}

	const {
		name,
		image,
		ki,
		maxKi,
		race,
		gender,
		description,
		affiliation,
		originPlanet,
		transformations,
	} = data

	return (
		<section className="character-detail">
			<motion.div
				className="character-detail__container"
				initial={{ opacity: 0, y: 48 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55, type: 'spring', bounce: 0.15 }}>
				<motion.div
					className="character-detail__avatar"
					initial={{ scale: 0.7, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}>
					<img src={image} alt={name} />
				</motion.div>
				<div className="character-detail__info">
					<motion.h2
						className="character-detail__name"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						{name}
					</motion.h2>
					<div className="character-detail__meta">
						{affiliation && (
							<div className="character-detail__meta-item character-detail__meta-item--affiliation">
								<span>Afiliación:</span>
								<b>{affiliation}</b>
							</div>
						)}
						{race && (
							<div className="character-detail__meta-item character-detail__meta-item--race">
								<span>Raza:</span>
								<b>{race}</b>
							</div>
						)}
						{gender && (
							<div className="character-detail__meta-item character-detail__meta-item--gender">
								<span>Género:</span>
								<b>
									{gender === 'Male'
										? '♂️'
										: gender === 'Female'
										? '♀️'
										: gender}
								</b>
							</div>
						)}
						{ki && (
							<div className="character-detail__meta-item character-detail__meta-item--ki">
								<span>Ki:</span>
								<motion.b
									className="character-detail__meta-important"
									initial={{ scale: 0.6, color: '#fff' }}
									animate={{ scale: 1.1, color: '#fcaf17' }}
									transition={{
										duration: 0.7,
										delay: 0.45,
										type: 'spring',
									}}>
									{ki}
								</motion.b>
							</div>
						)}
						{maxKi && (
							<div className="character-detail__meta-item character-detail__meta-item--maxki">
								<span>MaxKi:</span>
								<motion.b
									className="character-detail__meta-important"
									initial={{ scale: 0.6, color: '#fff' }}
									animate={{ scale: 1.2, color: '#49f2c4' }}
									transition={{
										duration: 0.7,
										delay: 0.5,
										type: 'spring',
									}}>
									{maxKi}
								</motion.b>
							</div>
						)}
					</div>
					{description && (
						<motion.p
							className="character-detail__desc"
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.45 }}>
							{description}
						</motion.p>
					)}

					{originPlanet && (
						<motion.div
							className="character-detail__planet"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}>
							<div className="character-detail__planet-img">
								<img
									src={originPlanet.image}
									alt={originPlanet.name}
								/>
							</div>
							<div className="character-detail__planet-info">
								<h4>
									Planeta de Origen:{' '}
									<span>{originPlanet.name}</span>
									{originPlanet.isDestroyed && (
										<span className="character-detail__planet-destroyed">
											{' '}
											🔥 destruido
										</span>
									)}
								</h4>
								<p>{originPlanet.description}</p>
							</div>
						</motion.div>
					)}

					{(transformations?.length ?? 0) > 0 && (
						<motion.div
							className="character-detail__transformations"
							initial={{ opacity: 0, y: 28 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.75 }}>
							<h4>Transformaciones</h4>
							<div className="character-detail__transform-list">
								{transformations &&
									transformations.map((tf) =>
										!tf.deletedAt ? (
											<motion.div
												className="character-detail__transform-card"
												key={tf.id}
												whileHover={{
													scale: 1.08,
													boxShadow:
														'0 2px 20px #fcaf1758',
												}}
												transition={{
													type: 'spring',
													stiffness: 300,
												}}>
												<img
													src={tf.image}
													alt={tf.name}
												/>
												<div className="character-detail__transform-name">
													{tf.name}
												</div>
												<div className="character-detail__transform-ki">
													Ki: <b>{tf.ki}</b>
												</div>
											</motion.div>
										) : null,
									)}
							</div>
						</motion.div>
					)}

					<button
						className="character-detail__back"
						onClick={() => navigate(-1)}>
						← Volver
					</button>
				</div>
			</motion.div>
		</section>
	)
}
