# Nostr NIP-26 in TypeScript

## Synopsis

Impelementation of [Nostr delegated event signing](https://github.com/nostr-protocol/nips/blob/master/26.md) or what I like to call, "The Service Provider auth flow."

## Why does this exist?

We want to build user experiences that promote nsec self-custody. We want to publish Nostr events on a user's behalf, but not have unlimited access to their master key.

NIP-26 means that a delegator can give permission to a delegatee to sign specific Nostr event kinds on delegator's behalf for a limited time. We want to give the user a, "set it and forget it" experience, where we can publish Nostr events for them when they are not present. This behavior is useful for many automation tasks such as notifications, and automatic syncronization of external social media with Nostr.

## Usage

### Performing and checking for delegation

```js
import { nip26, getPublicKey, generatePrivateKey } from '@insanity54/nip26'

// delegator
let sk1 = generatePrivateKey()
let pk1 = getPublicKey(sk1)

// delegatee
let sk2 = generatePrivateKey()
let pk2 = getPublicKey(sk2)

// generate delegation
let delegation = nip26.createDelegation(sk1, {
  pubkey: pk2,
  kind: 1,
  since: Math.round(Date.now() / 1000),
  until: Math.round(Date.now() / 1000) + 60 * 60 * 24 * 30 /* 30 days */,
})

// the delegatee uses the delegation when building an event
let event = {
  pubkey: pk2,
  kind: 1,
  created_at: Math.round(Date.now() / 1000),
  content: 'hello from a delegated key',
  tags: [['delegation', delegation.from, delegation.cond, delegation.sig]],
}

// finally any receiver of this event can check for the presence of a valid delegation tag
let delegator = nip26.getDelegator(event)
assert(delegator === pk1) // will be null if there is no delegation tag or if it is invalid
```

Please consult the tests or [the source code](https://github.com/fiatjaf/nostr-tools) for more information that isn't available here.


## Controversy

fiatjaf thinks [NIP-26](https://fiatjaf.com/4c79fd7b.html) [should not exist](https://github.com/nbd-wtf/nostr-tools/pull/323#issuecomment-1854144817). Thus, NIP-26 was removed from nostr-tools [(without consensus)](https://github.com/nbd-wtf/nostr-tools/pull/323#issuecomment-1854213944) in [December 2023](https://github.com/nbd-wtf/nostr-tools/commit/867aa11d126a924e615e32871700d66b0f02e241#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519). 

### [NIP-26 has no key revocation method.](https://github.com/nostr-protocol/nips/issues/247).

If the service provider gets pwnd, the attacker can post as the delegator until the delegation expires.


There is discussion to [deprecate NIP-26](https://github.com/nostr-protocol/nips/pull/1051).

### Why not NIP-46?

NIP-46 is offered as an alternative to NIP-26, however NIP-46 cannot handle offline signing. For NIP-46 remote signatures, a user must be present to click the buttons. NIP-26 solves the problem of offline signing today, is thus useful, and should exist.


### [Why not just use the master key? I assume you already have access](https://github.com/nbd-wtf/nostr-tools/pull/323#issuecomment-1854234819)

No. We don't have access to the user's master key, and we don't want it. We only have access to the user's delegated child key.


## Helpful dev tools

  * https://nostrtool.com/ (https://github.com/kdmukai/nostrtool)

