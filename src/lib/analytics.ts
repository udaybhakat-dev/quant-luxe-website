/**
 * Conversion-event instrumentation point for the SEM funnel.
 *
 * This is an academic prototype with no real ad account or analytics
 * property connected, so events are logged to the console rather than
 * sent anywhere. Every call site below (view_item, add_to_cart,
 * begin_checkout, purchase) is named to match GA4/Google Ads conversion
 * event conventions — swapping this function's body for a real
 * `gtag('event', name, payload)` call is the only change needed to wire
 * up live conversion tracking later.
 */
export type ConversionEvent = "view_item" | "add_to_cart" | "begin_checkout" | "purchase";

export function trackEvent(name: ConversionEvent, payload: Record<string, unknown> = {}) {
  if (import.meta.env.DEV) {
    console.info(`[analytics] ${name}`, payload);
  }
}
