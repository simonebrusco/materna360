// /lib/actions.js
import { get, set, keys } from "./storage";

export function record(type, payload = {}) {
  const list = get(keys.actions, []);
  const entry = { type, payload, ts: Date.now() };
  set(keys.actions, [...(Array.isArray(list) ? list : []), entry]);
}
