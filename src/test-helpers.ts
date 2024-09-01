import type { Event } from 'nostr-tools/core'

export function buildEvent(params: Partial<Event>): Event {
  return {
    id: '',
    kind: 1,
    pubkey: '',
    created_at: 0,
    content: '',
    tags: [],
    sig: '',
    ...params,
  }
}