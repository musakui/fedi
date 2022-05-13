# Fediverse Tools

[![npm](https://img.shields.io/npm/v/@musakui/fedi.svg)](https://www.npmjs.com/package/@musakui/fedi)

## Install

```sh
$ npm i @musakui/fedi
```

## Usage

### HTTP Signatures

```js
import * as HS from '@musakui/fedi/hs'
import { readFileSync } from 'fs'

HS.useKey('[keyId]', readFileSync('./private.pem'))

const resp = await HS.sendRequest({
  url: 'https://mastodon.social/inbox',
  headers: {
    'content-type': 'application/activity+json',
  },
  body: JSON.stringify({
    // some ActivityPub object
  }),
})

console.log(await resp.text())
```
