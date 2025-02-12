# Mariana Tek Node.js SDK

[![npm version](https://img.shields.io/npm/v/@macknolandev/marianatek-node)](https://www.npmjs.com/package/@macknolandev/marianatek-node)
[![License](https://img.shields.io/github/license/mackenzienolan/marianatek-node)](LICENSE)

An unofficial Node.js SDK for Mariana Tek's APIs. This library provides convenient access to Mariana Tek's fitness studio management API for applications written in JavaScript and TypeScript.

## Installation

```sh
npm install @macknolandev/marianatek-node
# or
yarn add @macknolandev/marianatek-node
# or
pnpm add @macknolandev/marianatek-node
```

## Features

- Full TypeScript support
- Easy authentication with API keys
- Simplified access to Mariana Tek's endpoints
- Promise-based API for cleaner asynchronous code

## Usage

### Importing the SDK

```typescript
import { createMarianaTekClient } from "@macknolandev/marianatek-node";
```

### Initializing the SDK

```typescript
const mt = createMarianaTekClient({
  token: "your_access_token_here",
  subdomain: "your_subdomain_here",
});
```

## API Reference

### `createMarianaTekClient(options)`

Creates a new instance of the SDK.

#### Options

- `token` (string, required): Your Mariana Tek access token.
- `subdomain` (string, required): Your Mariana Tek subdomain.

### Methods

## 🤝 How to Contribute

We're open to all community contributions!

## 📝 License

This project is licensed under the **MIT license**.

See [LICENSE](https://github.com/mackenzienolan/marianatek-node/blob/main/LICENSE) for more information.

## Disclaimer

This SDK is unofficial and not affiliated with Mariana Tek. Use at your own risk.
