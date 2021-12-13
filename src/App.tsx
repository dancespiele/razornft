import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { tokensReducer } from './store/tokens';
import { Web3ReactProvider } from '@web3-react/core'
// import { BrowserRouter, Route } from 'react-router-dom'
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import {WalletConnect} from './components/Wallet';

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
            <WalletConnect/>
        </Web3ReactProvider>
    </Provider>
);