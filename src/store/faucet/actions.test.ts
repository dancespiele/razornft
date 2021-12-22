import { calcReward, getNFT, claimRZR } from './actions';
import * as Types from './types';

jest.mock('../../utils/helpers', () => ({
    methods: {
        calcReward: () => {
            return {
                call: () => {
                    return 5 * 10 ** 18;
                }
            };
        },
        faucetNFT: () => {
            return {
                send: () => ({}),
            };
        },
        mintRZR: () => {
            return {
                send: () => ({}),
            }
        }       
    },
    web3: {
        utils: {
            keccak256: (text) => text,
            fromWei: (value: number) => value / 10 ** 18,
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

    it('should get the rewards won', async () => {
        await calcReward('0')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].payload).toBe(5);
        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.FAUCET_CALC_REWARD);
    });
    
    it('should get NFT', async () => {
        await getNFT('0')(dispatchMock);

        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.FAUCET_GET_NFT);
    });

    it('should mint RZR', async () => {
        await claimRZR('0')(dispatchMock);

        console.log(dispatchMock.mock.calls);

        expect(dispatchMock.mock.calls[1][0].type).toBe(Types.FAUCET_MINT_RZR);
    });
});