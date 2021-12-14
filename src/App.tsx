import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { tokensReducer } from './store/tokens';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Route} from 'react-router-dom';
import { routes } from './routes';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { Level } from 'react-bulma-components';
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
            <Level>
                <Level.Side justifyContent="flex-start">
                    <Level.Item>
                        <MainMenu/>
                    </Level.Item>
                </Level.Side>
                <Level.Side justifyContent="flex-end">
                    <Level.Item>
                        <BrowserRouter>
                            {routes.map(route => (
                                <Route path={route.path} element={route.component}/>
                            ))}
                        </BrowserRouter>
                    </Level.Item>
                    <Level.Item>
                        <WalletConnect/>
                    </Level.Item>
                </Level.Side>
            </Level>
        </Web3ReactProvider>
    </Provider>
);