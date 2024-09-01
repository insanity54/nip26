# Nostr NIP-26 in TypeScript

## Synopsis

Impelementation of [Nostr delegated event signing](https://github.com/nostr-protocol/nips/blob/master/26.md)

## Why does this exist?

We want to build user experiences that promote nsec self-custody. We want to publish Nostr events on a user's behalf, but not have unlimited access to their master key.

NIP-26 means that a delegator can give permission to a delegatee to sign specific Nostr event kinds on delegator's behalf for a limited time. We want to give the user a, "set it and forget it" experience, where we can publish Nostr events for them when they are not present. This behavior is useful for many automation tasks such as notifications, and automatic syncronization of external social media with Nostr.


## Controversy

fiatjaf thinks [NIP-26](https://fiatjaf.com/4c79fd7b.html) [should not exist](https://github.com/nbd-wtf/nostr-tools/pull/323#issuecomment-1854144817). Thus, NIP-26 was removed from nostr-tools [(without consensus)](https://github.com/nbd-wtf/nostr-tools/pull/323#issuecomment-1854213944) in [December 2023](https://github.com/nbd-wtf/nostr-tools/commit/867aa11d126a924e615e32871700d66b0f02e241#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519).

There is discussion to [deprecate NIP-26](https://github.com/nostr-protocol/nips/pull/1051).

### Why not NIP-46?

NIP-46 is offered as an alternative to NIP-26, however NIP-46 cannot handle offline signing. For NIP-46 remote signatures, a user must be present to click the buttons. NIP-26 solves the problem of offline signing today, is thus useful, and should exist.


### [Why not just use the master key? I assume you already have access](https://github.com/nbd-wtf/nostr-tools/pull/323#issuecomment-1854234819)

No. We don't have access to the user's master key, and we don't want it. We only have access to the user's delegated child key.


## Helpful dev tools

  * https://nostrtool.com/ (https://github.com/kdmukai/nostrtool)

