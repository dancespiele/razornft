import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { Menu } from 'react-bulma-components';

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
        <Menu>
        {routes.map((route, index) => (
            <Link key={route.name} to={route.path} onClick={() => onSetActiveMenu(index)}>
                <Menu.List.Item active={activeMenus[index]}>{route.name}</Menu.List.Item>
            </Link>
        ))}
        </Menu>
    )
}

export default MainMenu;