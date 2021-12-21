import { checkUserRole, checkGroupRole } from './actions';
import { methods } from '../../utils/helpers';

jest.mock('../../utils/helpers', () => ({
    methods: {
        role: false,
        hasRole: (role, address) => {
            if(address === '0') {
                methods.role = role === 'USER_ROLE'; 
            } else {
                methods.role = role ==='GROUP_ROLE'
            }

            return methods;
        },
        call: () => methods.role,
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

        console.log(dispatchMock.mock.calls);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(true);
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
    
    it('should not have group rule address 1', async () => {
        await checkGroupRole('1')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(true);
    });
});