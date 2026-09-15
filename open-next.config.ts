import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  // Store prerendered/ISR pages in Workers KV (binding NEXT_INC_CACHE_KV in
  // wrangler.jsonc) instead of re-rendering on every request.
  incrementalCache: kvIncrementalCache,
  // NOTE: enableCacheInterception is deliberately OFF — the interception
  // path skips next.config redirects/headers, breaking the www→apex
  // redirect and the staging-host noindex rules (verified locally).
  // The KV render cache alone removes the per-request re-render cost.
  enableCacheInterception: false,
  // Run ISR revalidations inline (via waitUntil) — no queue infra needed.
  queue: "direct",
});
