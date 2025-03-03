import NavBar from '../NavBar/NavBar'
import LavaWall from '../Background/LavaWall'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Layout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen">
            <NavBar />
            {/* Main content wrapper with left padding for desktop and top padding for mobile */}
            <div className={`${isMobile ? 'pt-10' : 'pl-10'} min-h-screen`}>
                <LavaWall />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout