import Faucet from './page/Faucet';
import Group from './page/Group';
import User from './page/User';

interface route {
    path: string;
    name: string;
    component: unknown;
}

export const routes: route[] = [{
    path: "/",
    name: "faucet",
    component: <Faucet/>,
}, {
    path: "/user",
    name: "user",
    component: <User/>,
}, {
    path: "/group",
    name: "group",
    component: <Group/>,
}];