import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.ts'

// import '@fontsource/inter/400.css'
// import '@fontsource/inter/600.css'
// import '@fontsource/inter/700.css'
// import '@fontsource/bebas-neue/400.css'

import './styles/main.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
)
