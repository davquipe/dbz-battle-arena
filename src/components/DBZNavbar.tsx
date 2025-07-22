import { NavLink } from 'react-router-dom'
import './DBZNavbar.scss'

const links = [
	{ to: '/', label: 'Inicio' },
	{ to: '/battle', label: 'Battle Arena' },
	{ to: '/characters', label: 'Personajes' },
	{ to: '/history', label: 'Historial' },
	{ to: '/favorites', label: 'Favoritos' },
]

const DBZNavbar = () => (
	<nav className="dbz-navbar">
		<div className="dbz-navbar__logo">
			{/* Puedes usar tu logo SVG o una imagen aquí */}
			<span>DBZ ARENA</span>
		</div>
		<ul className="dbz-navbar__links">
			{links.map((link) => (
				<li key={link.to}>
					<NavLink
						to={link.to}
						className={({ isActive }) =>
							`dbz-navbar__link${isActive ? ' active' : ''}`
						}
						end>
						{link.label}
					</NavLink>
				</li>
			))}
		</ul>
	</nav>
)

export default DBZNavbar
