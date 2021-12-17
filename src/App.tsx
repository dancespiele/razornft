import React, { ReactElement } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { tokensReducer } from './store/tokens';
import { faucetReducer } from './store/faucet';
import { accessReducer } from './store/access';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { Columns, Level } from 'react-bulma-components';
import WalletConnect from './components/Wallet';
import MainMenu from './components/MainMenu';

const globalFormat = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: '',
};

BigNumber.config({ FORMAT: globalFormat });

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];

const reducers = combineReducers({
    tokens: tokensReducer,
    faucet: faucetReducer,
    access: accessReducer,
});

const store = createStore(
    reducers,
    composeEnhancers
        ? composeEnhancers(applyMiddleware(thunk))
        : applyMiddleware(thunk),
)

export const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider)
    return library
};

export const App = () => (
    <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
            <Columns>
                <Columns.Column className="is-8">
                    <MainMenu/>
                </Columns.Column>
                <Columns.Column className="is-4">
                    <Level alignContent="flex-end">
                        <Level.Item>
                            <WalletConnect/>
                        </Level.Item>
                    </Level>
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="is-full">
                    <Routes>
                        {routes.map(route => (
                            <Route key={route.name} path={route.path} element={route.component as ReactElement}/>
                        ))}
                    </Routes>
                </Columns.Column>
            </Columns>
            </BrowserRouter>
        </Web3ReactProvider>
    </Provider>
);