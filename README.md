# Pre-requisites

```shell
npm i
npx hardhat compile
```

Update `pvtKey` variable in `hardhat.config.ts`.

## Deploy Factory

```
npx hardhat runs scripts/deployFactory.ts --network luksoTestnet
```

## Deploy Owner contract through the factory

```
npx hardhat runs scripts/deployOwnerThroughFactory.ts --network luksoTestnet
```
