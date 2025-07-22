import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './DBZNavbar.scss'

const links = [
	{ to: '/', label: 'Inicio' },
	{ to: '/battle', label: 'Battle Arena' },
	{ to: '/characters', label: 'Personajes' },
	{ to: '/history', label: 'Historial' },
	{ to: '/favorites', label: 'Favoritos' },
]

const DBZNavbar = () => {
	const [open, setOpen] = useState(false)

	return (
		<header className="dbz-navbar">
			<div className="dbz-navbar__container">
				<NavLink
					to="/"
					className="dbz-navbar__logo"
					aria-label="Ir al inicio">
					<span className="dbz-navbar__brand">
						<span className="dbz-navbar__brand--dragon">
							DRAGON
						</span>
						<span className="dbz-navbar__brand--ball">BALL</span>
						<span className="dbz-navbar__brand--arena">
							<span className="dbz-navbar__star">★</span>
							ARENA
						</span>
					</span>
				</NavLink>
				<button
					className={`dbz-navbar__burger${open ? ' is-active' : ''}`}
					onClick={() => setOpen(!open)}
					aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
					aria-expanded={open}
					aria-controls="navbar-menu">
					<span />
					<span />
					<span />
				</button>
				<nav
					className={`dbz-navbar__menu${open ? ' is-open' : ''}`}
					id="navbar-menu"
					aria-hidden={!open}>
					<ul className="dbz-navbar__links">
						{links.map((link) => (
							<li key={link.to}>
								<NavLink
									to={link.to}
									className={({ isActive }) =>
										`dbz-navbar__link${
											isActive ? ' active' : ''
										}`
									}
									end
									onClick={() => setOpen(false)}>
									{link.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{open && (
				<div
					className="dbz-navbar__overlay"
					onClick={() => setOpen(false)}
				/>
			)}
		</header>
	)
}

export default DBZNavbar
