# Pubman

> Publish packages automatically if their version has changed

## Installation

With pnpm (recommended)

```bash
pnpm install @kienleholdings/pubman
```

With yarn

```bash
yarn add @kienleholdings/pubman
```

With npm

```bash
npm install @kienleholdings/pubman
```

## Usage

`pubman <options>`

## Example

`pubman --npmCommand yarn --packagesDir ./other-packages --parallel`

## Options

### `--npmCommand <name>`

By default, `pubman` uses `pnpm` for command execution. You may want to use `yarn` or `npm` instead,
thus you can change what client we use to execute commands from here

### `--packagesDir <directory>`

By default, `pubman` searches for packages in `./packages`. If you keep your packages in a different
directory, you can specify that with this option

### `--parallel`

Runs commands in each package simultaneously. Generally recommended, but you may want to omit this
if your machine is lower-spec
