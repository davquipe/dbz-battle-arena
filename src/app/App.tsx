import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const App = () => (
	<div className="dbz-app">
		<Suspense fallback={<div className="dbz-loader">Cargando...</div>}>
			<Outlet />
		</Suspense>
	</div>
)

export default App
