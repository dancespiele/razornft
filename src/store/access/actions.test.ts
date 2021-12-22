import { checkUserRole, checkGroupRole } from './actions';
import { methods } from '../../utils/helpers';
import * as Types from './types';

jest.mock('../../utils/helpers', () => ({
    methods: {
        hasRole: (role, address) => {
            let hasRole = false;
            if(address === '0') {
                hasRole = role === 'USER_ROLE'; 
            } else {
                hasRole = role === 'GROUP_ROLE'
            }

            return {
                call: () => hasRole,
            };
        },
    },
    web3: {
        utils: {
            keccak256: (text) => text,
        }
    }
}));

describe('access', () => {
    let dispatchMock;

    beforeAll(() => {
        dispatchMock = jest.fn();
    });

    afterEach(() => {
        dispatchMock.mockRestore()
    });

    it('should have the user rule address 0', async () => {
        await checkUserRole('0')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(true);
        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.ACCESS_HAS_USER_ROLE);
    });
    
    it('should not have user rule address 1', async () => {
        await checkUserRole('1')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(false);
    });

    it('should not have the group rule address 0', async () => {
        await checkGroupRole('0')(dispatchMock);

        console.log(dispatchMock.mock.calls);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(false);
    });
    
    it('should have group rule address 1', async () => {
        await checkGroupRole('1')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(true);
        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.ACCESS_HAS_GROUP_ROLE);
    });
});