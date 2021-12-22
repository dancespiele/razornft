import * as Types from './types';
import { getBalance, getWalletAddress, approveToken, isApproved } from './actions';

jest.mock('../../utils/helpers', () => ({
    methods: {
        balanceOf: (address: string, id: number) => {
            return {
                call: () => {
                    if (id === 0) {
                        return 2;
                    }

                    return 5 * 10 ** 18
                }
            };
        },
        setApprovalForAll: () => {
            return {
                send: () => ({}),
            }
        },
        isApprovedForAll: () => {
            return {
                call: () => true
            }
        }
    },
    web3: {
        utils: {
            keccak256: (text) => text,
            fromWei: (value: number) => value / 10 ** 18,
        },
        eth: {
            getAccounts: () => ['0']
        }
    }
}));

describe('faucet', () => {
    let dispatchMock;

    beforeAll(() => {
        dispatchMock = jest.fn();
    });

    afterEach(() => {
        dispatchMock.mockRestore()
    });

    it('should get the account balance', async () => {
        await getBalance('0')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toStrictEqual({
            address: '0',
            balanceRAZOR: 2,
            balanceRZR: 5,
        })
        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.TOKENS_GET_BALANCE);
    });
    
    it('should get current account', async () => {
        await getWalletAddress()(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toBe('0');
        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.TOKENS_GET_WALLET_ADDRESS);
    });

    it('should approve all operations', async () => {
        await approveToken('0')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.TOKENS_APPROVE);
    });

    it('should be approved the address', async () => {
        await isApproved('0')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.TOKENS_IS_APPROVED);
        expect(dispatchMock.mock.calls[1][0].payload).toBe(true);
    })
});