# @macknolandev/clerk-zod

Zod schemas for Clerk's JSON models. This package provides type-safe validation for Clerk's API responses and webhook payloads.

## Installation

```bash
pnpm add @macknolandev/clerk-zod
```

## Usage

```ts
import { ClerkUserJSONSchema } from "@macknolandev/clerk-zod";

const user = ClerkUserJSONSchema.parse({
  id: "user_123",
  email: "test@test.com",
});
```
