# Pre-requisites

```shell
npm i
npx hardhat compile
```

Update `pvtKey` variable in `hardhat.config.ts`.

## Deploy Factory

```bash
npx hardhat runs scripts/deployFactory.ts --network luksoTestnet
```

## Deploy Owner contract through the factory

```bash
npx hardhat run scripts/deployOwnerThroughFactory.ts --network luksoTestnet
```

## Send funds to another address

```bash
npx hardhat run scripts/sendFunds.ts --network luksoTestnet
```

You can also test out the `pre-eip155`condition.
