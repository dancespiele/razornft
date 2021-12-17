import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { Navbar } from 'react-bulma-components';

const MainMenu = () => {
    const menus = Array<boolean>().fill(false, 0, routes.length);
    menus[0] = true;
    const [activeMenus, setActiveMenus] = useState(menus);

    const onSetActiveMenu = (index) => {
        const currentActiveMenu = Array<boolean>().fill(false, 0, routes.length);
        currentActiveMenu[index] = true;
        setActiveMenus(currentActiveMenu);
    }

    return (
        <Navbar>
            <Navbar.Menu>
                {routes.map((route, index) => (
                    <Link key={route.name} to={route.path}>
                        <Navbar.Item active={activeMenus[index]} onClick={() => onSetActiveMenu(index)}>
                            {route.name}
                        </Navbar.Item>
                    </Link>
                ))}
            </Navbar.Menu>
        </Navbar>
    )
}

export default MainMenu;