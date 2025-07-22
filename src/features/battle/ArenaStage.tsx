import './ArenaStage.scss'

const PARTICLE_COUNT = 28

export default function ArenaStage() {
	return (
		<div className="arena-stage">
			<div className="arena-stage__ring" />
			<div className="arena-stage__spot arena-stage__spot--left" />
			<div className="arena-stage__spot arena-stage__spot--right" />
			<div className="arena-stage__zeno" />
			<div>
				{[...Array(PARTICLE_COUNT)].map((_, i) => (
					<div
						key={i}
						className={`arena-stage__particle arena-stage__particle--${
							i % 4
						}`}
					/>
				))}
			</div>
		</div>
	)
}
