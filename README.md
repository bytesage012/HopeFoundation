
# HOPEFOUNDATION — Case Study (Agency)

A fundraising campaign prototype built by the agency as a client case study. The page demonstrates how we design and implement donation-focused landing pages with clear goals: communicate impact, build trust, and drive conversions.

Project context
- Role: Frontend prototype & UX implementation for a non-profit campaign landing page.
- Goals: Highlight impact metrics, provide clear donation tiers, show partner credibility and collect donor information.
- Outcome: A conversion-optimized page with animated metrics, a sticky donation sidebar and a focused donation modal.

Tech stack & key files
- React + Vite + Tailwind CSS
- `src/App.jsx` — campaign data (`CAMPAIGN_DATA`) and full page implementation: hero, progress bar, impact metrics (animated), programs, gallery, testimonials, donation sidebar and modal.

How to run

```bash
npm install
npm run dev
```

Implementation notes
- Animated metrics: implemented with an `IntersectionObserver` to trigger counters when the metrics section enters the viewport. This is a lightweight technique that avoids animating off-screen.
- Sticky donation sidebar: toggled using a scroll listener and `isSidebarSticky` state for large screens.
- Donation flow: UI is implemented fully client-side; `handleFinalDonation` currently uses `alert()` to simulate success.

Security & production-readiness
- Do NOT use the client-side donation flow in production. Integrate a payment processor (Stripe, PayPal) and implement server-side verification and receipt emails.
- Ensure PCI compliance, CSRF protection, and server-side logging for transactions. Use HTTPS and secure storage for any PII.

Reusing this work as an agency template
- This prototype is an excellent starting point for donation pages. To convert to a reusable template:
	- Extract `DonationSidebar`, `DonationModal`, `ImpactMetrics`, and `ProgressBar` into components.
	- Add integration points (API endpoints) for donation processing and analytics events.
	- Add tests around the metric animations and form validation.

Next steps I can help with
- Wire Stripe Checkout/Payment Intents and implement server-side donation endpoints.
- Add unit and integration tests for the donation flow and metrics animation.

