# Razornft

Razornft is a test dapp which shows how to works with contracts [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) and access control. The dApp is simple, account claims `RAZOR` NFT in order to mint `RZR` tokens, the account will have automaticaly `user access` once that the first `RAZOR` NFT is claimed and `group access` when the first `RZR` tokens minted are claimed too.

## Requirements

* node v14
* npm v6
* [Metamask](https://metamask.io/)
* [Ganache GUI](https://trufflesuite.com/ganache/)

## How to run the dapp

1. Clone the repository project `git clone https://github.com/dancespiele/razornft.git`
2. Execute Ganache GUI and create a workspace setting the configuration as same as exits in the file `truffle-config.js` of the project in the development section
3. Set Metamask following this [guide](https://trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask.html)
4. Inside of the root project folder execute `npm install` to install the packages
5. Build and deploy the contract `Razor` `truffle migrate --network development`
6. Create in the root project folder a `.env` file which should looks like this:

```
RPC_URL=http://127.0.0.1:7545
CHAIN_ID=1337
OWNER_ADDRESS=0x2ac9180390a96fbc9532384e13e96ba7cb427403 // change the address to the assigned one by ganache
CONTRACT_ADDRESS=0x5861a03329CcD45A6eF762bc84DD49c0e7cBA44B // change the contract address to that one showing once that the contract is deployed
```

8. Run the project `npm start`


## Run contract tests

1. Follow the steps 1, 2, 4 of `How to run the dapp` if are not done before
2. Run the tests `truffle test`

## Run unit tests

1. Follow the steps 1, 4 of `How to run the dapp` if are not done before
2. Run the tests `npm test`

## License

Razornft is [MIT](LICENSE.md) licensed if are not done before