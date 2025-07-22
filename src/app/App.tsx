import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import DBZNavbar from '../components/DBZNavbar'

const App = () => (
	<div className="dbz-app">
		<DBZNavbar />
		<Suspense fallback={<div className="dbz-loader">Cargando...</div>}>
			<Outlet />
		</Suspense>
	</div>
)

export default App
