import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {Container, Content, Heading} from 'react-bulma-components';
import { useAccess, AccessState, checkGroupRole } from '../store/access'

const Group = () => {
    const dispatch = useDispatch();
    const wallet = useWeb3React();
    const access = useAccess() as AccessState;

    useEffect(() => {
        if(wallet.account) {
            dispatch(checkGroupRole(wallet.account))
        }
    }, [wallet.account]);

    return (
        <Container>
            <Heading>
                Group
            </Heading>
            <Content>
                {access.groupRole ? <p>You belong to group Role. Enjoy!</p>: 
                <p>You need to get RZR tokens to have group Role. If you have RAZOR NFTs you can claim RZR</p>}
            </Content>
        </Container>
    )
};

export default Group;
