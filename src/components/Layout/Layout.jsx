import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="">
            <NavBar />
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout