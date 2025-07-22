import { createBrowserRouter } from 'react-router-dom'

import App from '../app/App'
import Home from '../features/home/Home'
import Battle from '../features/battle/Battle'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: [
			{ index: true, Component: Home },
			{ path: 'battle', Component: Battle },
			// 		{ path: 'characters/:id', Component: CharacterDetail },
			//   { path: 'history', Component: History },
			//   { path: 'favorites', Component: Favorites },
			//   { path: '*', Component: NotFound },
		],
	},
])
