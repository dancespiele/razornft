import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Button, Form, Level } from 'react-bulma-components';
import { useTokens, getBalance, TokensState } from '../store/tokens';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from '../utils/localStorage';


export const WalletConnect = () => {
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
            dispatch(getBalance(address || wallet.account));

            if(!address) {
                setLocalStorage(wallet.account);
                setAddress(wallet.account);
            } else {
                setIsConnected(true);
            }
        }
    }, [isConnected])

    return (
        <>
            {!isConnected ? 
                <Level justifyContent="flex-end">
                    <Button color="" onClick={onWalletConnect}>Connect</Button>
                </Level> : 
                <Level justifyContent="flex-end">
                    <Level.Side align="right">
                        <Level.Item>
                            <Form.Input type="text" value={`RAZOR: ${tokens.balances.balanceRAZOR} RZR: ${tokens.balances.balanceRZR}`} disabled/>
                            <Form.Input type="text" value={address} disabled/>
                            <Button color="danger" onClick={onWalletDisconnect}>
                                Disconnect
                            </Button>
                        </Level.Item>
                    </Level.Side>
                </Level>
            }
        </>
    );
};