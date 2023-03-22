# fedi

> tools for the fediverse

[![npm](https://img.shields.io/npm/v/@musakui/fedi.svg)](https://www.npmjs.com/package/@musakui/fedi)

**Warning** this is still experimental and APIs are expected to change a lot

This project houses the low-level interfaces to interact with the Fediverse. It aims to be
- buildless (ESM)
- isomorphic (run in browser and Node)
- typed (with [JSDoc](https://jsdoc.app) annotations and TS declarations)

Documentation will be lacking, so please refer to [kotori](https://github.com/musakui/kotori) for usage examples.

## Modules
These are the main components. Please suggest more if you think they should be added.

### [ActivityPub](https://activitypub.rocks) (and ActivityStreams)
The core protocol for federated social networking. For a quick rundown, this [highly opinionated guide to learning about ActivityPub](https://tinysubversions.com/notes/reading-activitypub) is highly recommended.

Similar libraries
- [michaelcpuckett/activitypub-core](https://github.com/michaelcpuckett/activitypub-core)
- [activitypub-js/activitypub-types](https://github.com/SiranWeb/activitypub-types)

### `.well-known` endpoints
Some [Well-known URIs](https://en.wikipedia.org/wiki/Well-known_URI) have been defined for easy communication between services. The main ones are [WebFinger](https://webfinger.net) (to lookup handles) and [NodeInfo](https://github.com/jhass/nodeinfo) (server metadata).

### HTTP Signatures (and Keys)
To verify messages across services, HTTP requests are signed with keys.

**Note** There is some code for hs2019 but take note that it is not well supported
