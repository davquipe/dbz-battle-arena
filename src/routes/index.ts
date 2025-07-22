import { createBrowserRouter } from 'react-router-dom'

import App from '../app/App'
import Home from '../features/home/Home'
import Battle from '../features/battle/Battle'
import NotFound from '../features/notfound/NotFound'
import Favorites from '../features/favorites/Favorites'
import History from '../features/history/History'
import Characters from '../features/characters/Characters'
import CharacterDetail from '../features/characterDetail/CharacterDetail'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{ index: true, Component: Home },
			{ path: 'battle', Component: Battle },
			{ path: 'characters', Component: Characters },
			{ path: 'characters/:id', Component: CharacterDetail },
			{ path: 'history', Component: History },
			{ path: 'favorites', Component: Favorites },
			{ path: '*', Component: NotFound },
		],
	},
])
