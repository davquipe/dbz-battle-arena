import { motion } from 'framer-motion'
import './HeroSection.scss'
import { Link } from 'react-router-dom'

const HeroSection = () => (
	<section className="dbz-hero">
		<motion.div
			className="dbz-hero__logo"
			initial={{ scale: 0.6, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.8, ease: 'backOut' }}>
			<h1>
				DBZ <span>Arena</span>
			</h1>
		</motion.div>
		<motion.p
			className="dbz-hero__text"
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.6, duration: 0.6 }}>
			¡Enfrenta a los personajes más poderosos de Dragon Ball Z y descubre
			quién es el verdadero campeón!
		</motion.p>
		<motion.div
			className="dbz-hero__actions"
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ delay: 1, duration: 0.4 }}>
			<Link to="/battle" className="dbz-hero__cta">
				Entrar a la Arena
			</Link>
		</motion.div>
	</section>
)
export default HeroSection
