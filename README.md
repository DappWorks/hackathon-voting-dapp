# Hackathon Voting Dapp

A dapp built to showcase web3 usage at the DappWorks Hackathon.

## How It Was Built

This project is based off of [Truffle React box](https://github.com/truffle-box/react-box) which in turn uses [Create React App](https://github.com/facebook/create-react-app). It uses [Ant Design](https://ant.design/) for design.

To build this yourself, install `npm` and `truffle`.

Then create an empty folder to house your project and run `truffle unbox react`.

Then install bignumber.js in the client:

```sh
cd client
npm install bignumber.js --save
```

To deploy the contracts to a private network run:

```sh
truffle develop # starts a truffle session
# within the truffle session:
compile
migrate
```

Then run the client:

```sh
cd client
npm start
```

Make sure you have MetaMask Chrome extension installed and set the network to: `http://127.0.0.1:9545` using the `Custom RPC` option.

Visit [http://localhost:3000/](http://localhost:3000/) and visit your dapp!

To get access to an account with 100 ether, click on the MetaMask extension, go to `Settings > Import Account` and enter one of the private keys you saw when running `truffle develop` (e.g. `c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3`). You will now have an account with fake ether for you to play with on your local network. (Note, never send real ether to this account).

## Updating the smart contract

After updating the Solidity code you will need to redeploy. You will also need to link the client to the latest build code which can be done by running:

```sh
cd client
npm run link-contracts
```
