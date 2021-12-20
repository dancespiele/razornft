import React, {useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Button, Form } from 'react-bulma-components';
import { useTokens, getBalance, TokensState } from '../store/tokens';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from '../utils/localStorage';
import { setAddressWalletString } from '../utils/helpers';


const WalletConnect = () => {
    const wallet = useWeb3React();
    const dispatch = useDispatch();
    const tokens = useTokens() as TokensState;
    const [isConnected, setIsConnected ] = useState(false);
    const [address, setAddress] = useState(getLocalStorage());

    const connector = new InjectedConnector({
        supportedChainIds: [parseInt(process.env.CHAIN_ID)],
    });


    const onWalletConnect = async () => {
        await wallet.activate(connector);
        setIsConnected(true);
    };

    const onWalletDisconnect = async () => {
        await wallet.deactivate();
        deleteLocalStorage();
        setAddress('');
        setIsConnected(false);
    }

    useEffect(() => {
        if (isConnected || address) {
            if(!address) {
                setLocalStorage(wallet.account);
                setAddress(wallet.account);
            } else if (wallet.account && wallet.account !== address){
                onWalletDisconnect();
                setLocalStorage(wallet.account);
                setAddress(wallet.account);
            } else {
                onWalletConnect();
            }
        }
    }, [isConnected])

    useEffect(() => {
        if (address) {
            dispatch(getBalance(address));
        }
    }, [tokens.balances]);

    return (
        <>
        {!isConnected ? 
            <Button color="" onClick={onWalletConnect}>Connect</Button>
            :<>
                <Form.Input type="text" color="info" value={
                    `RAZOR: ${tokens.balances?.find(b => b.address === address)?.balanceRAZOR || 0} | RZR: ${tokens.balances?.find(b => b.address === address)?.balanceRZR || '0'}`} disabled/>
                <Form.Input type="text" color="primary" value={ address ? setAddressWalletString(address): ''} disabled/>
                <Button color="danger" onClick={onWalletDisconnect}>
                    Disconnect
                </Button>
            </>
        }
        </>
    );
};

export default WalletConnect;