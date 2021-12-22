import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import {Container, Content, Heading, Button, Columns} from 'react-bulma-components';
import { useTokens, getBalance, TokensState, isApproved, approveToken } from "../store/tokens";
import { getNFT, calcReward, claimRZR, useFaucet, FaucetState } from "../store/faucet";
import { OWNER_ADDRESS } from '../utils/helpers';

const Faucet = () => {
    const dispatch = useDispatch();
    const tokens = useTokens() as TokensState;
    const [balance, setBalance] = useState(0);
    const faucet = useFaucet() as FaucetState;
    const wallet = useWeb3React();
    
    const onFaucet = async () => {
        await dispatch(getNFT(wallet.account));
        await dispatch(getBalance(OWNER_ADDRESS));
        await dispatch(calcReward(wallet.account));
    }

    const onApprove = async () => {
        await dispatch(approveToken(wallet.account));
        await dispatch(isApproved(wallet.account));
    }

    const onClaim = async () => {
        await dispatch(claimRZR(wallet.account));
        await dispatch(calcReward(wallet.account));
    }

    useEffect(() => {
        dispatch(getBalance(OWNER_ADDRESS));
    }, []);

    useEffect(() => {
        setBalance(tokens.balances?.find(balance => balance.address === OWNER_ADDRESS )?.balanceRAZOR || 0)
    }, [tokens.balances]);

    useEffect(() => {
        if (wallet.account) {
            dispatch(isApproved(wallet.account));
            dispatch(calcReward(wallet.account));
        }
    }, [wallet.account]);

    return (
        <Container>
            <Heading>
                Faucet
            </Heading>
            <Content>
                <h3>NFT Left: {balance}</h3>
                <img style={{
                    height: 150
                }} src="https://bafybeiflaeprlgbc6pd3upvbehov6healatie3kn7jjmfadglnblo5nbua.ipfs.dweb.link/RZR_coin.png" alt="RAZOR NFT"/>
                <Columns>
                        {tokens.approved ?
                            <>
                                <Columns.Column size={1}>
                                    <Button color="success" onClick={onFaucet}>Get 1 NFT</Button>
                                </Columns.Column>
                                <Columns.Column size={1}>
                                    <Button color="success" onClick={onClaim} disabled={!(parseFloat(faucet.rewards) > 0.0) }>Claim {faucet.rewards} RZR</Button>
                                </Columns.Column>
                            </>
                        : 
                            <Columns.Column size={wallet.active ? 1 : 2}>
                                {wallet.active ? <Button color="primary" onClick={onApprove}>Approve</Button>: <p>Please connect your wallet</p>}
                            </Columns.Column>
                        }
                    <div></div>
                </Columns>
            </Content>
        </Container>
    )
};

export default Faucet;
