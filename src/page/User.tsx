import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {Container, Content, Heading} from 'react-bulma-components';
import { useAccess, AccessState, checkUserRole } from '../store/access'

const User = () => {
    const dispatch = useDispatch();
    const wallet = useWeb3React();
    const access = useAccess() as AccessState;

    useEffect(() => {
        if(wallet.account) {
            dispatch(checkUserRole(wallet.account))
        }
    }, [wallet.account]);

    return (
        <Container>
            <Heading>
                User
            </Heading>
            <Content>
                {access.userRole ? <p>You have user Role. Enjoy!</p>: <p>You need to get RAZOR NFT to have use Role</p>}
            </Content>
        </Container>
    )
};

export default User;
