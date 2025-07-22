import { motion } from 'framer-motion'
import type { Character } from '../characters/charactersTypes'

export default function BattleResult({
	left,
	right,
	winner,
}: {
	left: Character | null
	right: Character | null
	winner: 'left' | 'right' | 'draw'
}) {
	return (
		<motion.div
			className="battle-result"
			initial={{ opacity: 0, y: -30, scale: 0.8 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ type: 'spring', stiffness: 330, damping: 18 }}>
			{winner === 'draw' ? (
				<span>¡Empate!</span>
			) : (
				<span>
					🏆 Gana{' '}
					<b style={{ color: '#fcaf17', fontWeight: 900 }}>
						{winner === 'left' ? left?.name : right?.name}
					</b>{' '}
					por poder máximo
				</span>
			)}
		</motion.div>
	)
}
