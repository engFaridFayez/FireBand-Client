<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'

const theme = ref<'dark' | 'light'>('dark')
</script>

<template>
  
  <main class="fireband-page pricing-page" :data-theme="theme" id="pricing-page">
    <NavBar :theme="theme" @toggle-theme="theme = theme === 'dark' ? 'light' : 'dark'" />
    <!-- ── HERO ─────────────────────────────────────────────── -->
    <div class="pricing-hero">
      <div class="hero-copy">
        <p class="eyebrow">Booking made easy</p>
        <h1>Choose the plan that fits your show.</h1>
        <p class="hero-lede">
          Designed for festivals, private events, and headline nights — each package delivers
          the same high-energy performance, tailored to your stage, crowd, and vision.
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="mailto:booking@fireband.show">Contact booking</a>
          <RouterLink class="btn btn-ghost" to="/">Back to home</RouterLink>
        </div>
      </div>

      <div class="pricing-panel">
        <div class="pricing-panel-header">
          <span class="panel-label">Pricing plans</span>
          <strong class="panel-title">Simple, bold, and stage‑ready.</strong>
        </div>

        <div class="plan-grid">
          <!-- Starter -->
          <article class="plan-card plan-lite">
            <header class="card-header">
              <span class="plan-tier">Starter</span>
              <strong class="plan-price">$4,500</strong>
            </header>
            <p class="plan-desc">Perfect for private parties, intimate evenings, and local showcases.</p>
            <ul class="plan-features">
              <li>60 min live set</li>
              <li>Custom song list</li>
              <li>Basic lighting setup</li>
              <li>One sound check</li>
            </ul>
            <a class="btn btn-card" href="mailto:booking@fireband.show">Book Starter</a>
          </article>

          <!-- Premium -->
          <article class="plan-card plan-premium">
            <div class="featured-badge">Most popular</div>
            <header class="card-header">
              <span class="plan-tier">Premium</span>
              <strong class="plan-price">$7,800</strong>
            </header>
            <p class="plan-desc">Our most-requested package for festivals, brand events, and headline shows.</p>
            <ul class="plan-features">
              <li>90 min live set</li>
              <li>Featured lighting design</li>
              <li>Two sound checks</li>
              <li>Dedicated stage director</li>
            </ul>
            <a class="btn btn-card btn-card-fire" href="mailto:booking@fireband.show">Book Premium</a>
          </article>

          <!-- Elite -->
          <article class="plan-card plan-elite">
            <header class="card-header">
              <span class="plan-tier">Elite</span>
              <strong class="plan-price">$11,200</strong>
            </header>
            <p class="plan-desc">Full production for headline nights, festival closers, and premium private events.</p>
            <ul class="plan-features">
              <li>120 min live set</li>
              <li>Immersive lighting &amp; visuals</li>
              <li>VIP stage management</li>
              <li>Pre-show consultation</li>
            </ul>
            <a class="btn btn-card" href="mailto:booking@fireband.show">Book Elite</a>
          </article>
        </div>
      </div>
    </div>

    <!-- ── WHAT YOU GET ────────────────────────────────────── -->
    <section class="pricing-details">
      <div class="section-intro">
        <p class="eyebrow">What you get</p>
        <h2>Everything in the plan is built around your event.</h2>
      </div>
      <div class="details-grid">
        <article class="detail-card">
          <div class="detail-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <strong>Trusted live experience</strong>
          <p>Every performance is tuned to the room with tight transitions, audience energy, and professional stage execution.</p>
        </article>
        <article class="detail-card">
          <div class="detail-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </div>
          <strong>Scalable production</strong>
          <p>From intimate rooms to large outdoor stages, we bring the right sound, lights, and crew to fit the venue.</p>
        </article>
        <article class="detail-card">
          <div class="detail-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <strong>Custom show flow</strong>
          <p>We work with you before the event to shape a set list, entrances, and special moments that match your program.</p>
        </article>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────── -->
    <section class="pricing-cta">
      <div class="cta-inner">
        <div class="cta-copy">
          <p class="eyebrow">Ready to book?</p>
          <h2>Let's lock in your date and build the show around your crowd.</h2>
        </div>
        <a class="btn btn-primary btn-lg" href="mailto:booking@fireband.show">
          Email booking@fireband.show
        </a>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── LIGHT THEME OVERRIDE ───────────────────────────────────── */
.fireband-page[data-theme='light'] {
  --bg:          #fff8ef;
  --surface:     #ffffff;
  --surface-alt: #fff0dc;
  --line:        rgba(20, 20, 24, 0.13);
  --line-strong: rgba(20, 20, 24, 0.22);
  --text:        #d6e5e4;
  --muted:       #625b56;
  --fire:        #ff4b12;
  --fire-pale:   rgba(255, 75, 18, 0.10);
  --gold:        #c47f00;
  --cyan:        #008fb3;
  --cyan-pale:   rgba(0, 143, 179, 0.10);
  --shadow:      0 24px 72px rgba(164, 91, 42, 0.18);
  --shadow-sm:   0 8px 32px rgba(164, 91, 42, 0.12);

  background:
    radial-gradient(ellipse 60% 40% at 15% 5%,  rgba(255, 176, 0, 0.22) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 88% 12%, rgba(0, 201, 255, 0.14) 0%, transparent 50%),
    radial-gradient(ellipse 50% 60% at 50% 95%, rgba(244, 172, 52, 0.06) 0%, transparent 60%),
    linear-gradient(160deg, #fff8ef 0%, #ffffff 55%, #f1fbff 100%);

  color: var(--text);
}
/* ── TOKENS ─────────────────────────────────────────────────── */
.fireband-page {
  --bg:            #060507;
  --surface:       #0f0d12;
  --surface-alt:   #161219;
  --line:          rgba(255, 255, 255, 0.10);
  --line-strong:   rgba(255, 255, 255, 0.18);
  --text:          #f5ede2;
  --muted:         #9e958d;
  --fire:          #ff5a2c;
  --fire-pale:     rgba(255, 90, 44, 0.14);
  --gold:          #f4ac34;
  --cyan:          #29cdff;
  --cyan-pale:     rgba(41, 205, 255, 0.12);
  --shadow:        0 24px 72px rgba(0, 0, 0, 0.36);
  --shadow-sm:     0 8px 32px rgba(0, 0, 0, 0.22);
  --radius-xl:     28px;
  --radius-lg:     20px;
  --radius-pill:   999px;
  --soft:        rgba(9, 10, 14, 0.062);
  --shadow-soft: 0 20px 60px rgba(164, 91, 42, 0.18);

  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--text);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background:
    radial-gradient(ellipse 60% 40% at 15% 5%,  rgba(255, 88, 42, 0.20) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 88% 12%, rgba(41, 205, 255, 0.13) 0%, transparent 50%),
    radial-gradient(ellipse 50% 60% at 50% 95%, rgba(244, 172, 52, 0.07) 0%, transparent 60%),
    linear-gradient(160deg, #040305 0%, #0a0810 55%, #050306 100%);
}

.pricing-page {
  padding-bottom: 0;
}

/* ── GLOBAL RESET ───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }
h1, h2, p, ul { margin: 0; padding: 0; }
ul { list-style: none; }
a { text-decoration: none; }

/* ── EYEBROW ────────────────────────────────────────────────── */
.eyebrow {
  display: inline-block;
  color: var(--gold);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

/* ── BUTTONS ────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 28px;
  height: 52px;
  border-radius: var(--radius-pill);
  font-size: 0.93rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
  cursor: pointer;
  white-space: nowrap;
}

.btn:hover  { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }

.btn-primary {
  background: linear-gradient(130deg, #fdd06a 0%, #ff6330 100%);
  color: #1a0c02;
  box-shadow: 0 12px 40px rgba(255, 88, 42, 0.30);
}
.btn-primary:hover { box-shadow: 0 18px 52px rgba(255, 88, 42, 0.42); }

.btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  border: 1px solid var(--line);
}
.btn-ghost:hover { background: rgba(255, 255, 255, 0.09); }

.btn-lg {
  height: 60px;
  padding: 0 36px;
  font-size: 1rem;
}

.btn-card {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  height: 46px;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
  border: 1px solid var(--line);
  transition: background 160ms ease, transform 160ms ease;
  white-space: nowrap;
}
.btn-card:hover { background: rgba(255, 255, 255, 0.12); transform: translateY(-1px); }
.btn-card-fire {
  background: linear-gradient(130deg, #ff6330, #f4ac34);
  color: #1a0c02;
  border: none;
}
.btn-card-fire:hover { box-shadow: 0 10px 30px rgba(255, 88, 42, 0.35); }

/* ── HERO ───────────────────────────────────────────────────── */
.pricing-hero {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px) clamp(20px, 3vw, 40px) clamp(32px, 5vw, 64px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
}

/* ── HERO COPY ──────────────────────────────────────────────── */
.hero-copy {
  position: sticky;
  top: clamp(72px, 10vw, 108px);
  padding: clamp(28px, 4vw, 44px);
  border-radius: var(--radius-xl);
  background: rgba(14, 12, 18, 0.92);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
}

.hero-copy::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  padding: 1px;
  background: linear-gradient(
    140deg,
    rgba(255, 88, 42, 0.30) 0%,
    transparent 42%,
    rgba(41, 205, 255, 0.18) 100%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.hero-copy > * { position: relative; }

.hero-copy h1 {
  font-size: clamp(2.6rem, 4.2vw, 4.4rem);
  font-weight: 900;
  line-height: 0.96;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}

.hero-lede {
  color: var(--muted);
  font-size: clamp(0.98rem, 1.4vw, 1.18rem);
  line-height: 1.80;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

/* ── PRICING PANEL ──────────────────────────────────────────── */
.pricing-panel {
  border-radius: var(--radius-xl);
  background: rgba(13, 11, 18, 0.90);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
}

.pricing-panel-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: clamp(22px, 3vw, 32px) clamp(22px, 3vw, 32px) 0;
}

.panel-label {
  color: var(--cyan);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.20em;
  text-transform: uppercase;
}

.panel-title {
  font-size: clamp(1.5rem, 2.2vw, 2.2rem);
  font-weight: 900;
  line-height: 1.1;
}

/* ── PLAN GRID ──────────────────────────────────────────────── */
.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: clamp(20px, 2.5vw, 28px);
  gap: clamp(12px, 1.5vw, 18px);
}

/* ── PLAN CARDS ─────────────────────────────────────────────── */
.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(20px, 2.5vw, 30px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  background: rgba(10, 8, 14, 0.96);
  transition: border-color 200ms ease;
}

.plan-card:hover { border-color: var(--line-strong); }

/* Premium highlight */
.plan-premium {
  background: linear-gradient(
    160deg,
    rgba(255, 88, 42, 0.10) 0%,
    rgba(244, 172, 52, 0.08) 100%
  );
  border-color: rgba(244, 172, 52, 0.28);
}
.plan-premium:hover { border-color: rgba(244, 172, 52, 0.45); }

/* Gradient border shimmer on hover for lite/elite */
.plan-lite::before,
.plan-elite::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  padding: 1px;
  background: linear-gradient(
    140deg,
    rgba(255, 88, 42, 0.18),
    transparent 40%,
    rgba(41, 205, 255, 0.12)
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease;
}
.plan-lite:hover::before,
.plan-elite:hover::before { opacity: 1; }

.featured-badge {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(90deg, #ff6330, #f4ac34);
  color: #1a0c02;
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.card-header { display: flex; flex-direction: column; gap: 6px; }

.plan-tier {
  color: var(--gold);
  font-size: 0.70rem;
  font-weight: 900;
  letter-spacing: 0.20em;
  text-transform: uppercase;
}

.plan-price {
  font-size: clamp(1.8rem, 2.6vw, 2.6rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}

.plan-desc {
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.75;
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1; /* pushes .btn-card to the bottom consistently */
}

.plan-features li {
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.5;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.plan-features li::before {
  content: '';
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--fire);
  translate: 0 -1px;
}

/* ── PRICING DETAILS ────────────────────────────────────────── */
.pricing-details {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: clamp(48px, 7vw, 88px) clamp(20px, 3vw, 40px);
}

.section-intro {
  margin-bottom: clamp(28px, 4vw, 44px);
}

.section-intro h2 {
  font-size: clamp(2rem, 3.6vw, 3.6rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 18ch;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(14px, 2vw, 22px);
}

.detail-card {
  padding: clamp(22px, 3vw, 36px);
  border-radius: var(--radius-lg);
  background: rgba(11, 9, 15, 0.96);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 200ms ease;
}
.detail-card:hover { border-color: var(--line-strong); }

.detail-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--fire-pale);
  border: 1px solid rgba(255, 88, 42, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fire);
}

.detail-card strong {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text);
}

.detail-card p {
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.80;
}

/* ── CTA ────────────────────────────────────────────────────── */
.pricing-cta {
  padding: 0 20px clamp(72px, 10vw, 112px);
}

.cta-inner {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: clamp(36px, 5vw, 56px) clamp(28px, 5vw, 60px);
  border-radius: var(--radius-xl);
  background: rgba(11, 9, 15, 0.96);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(24px, 4vw, 48px);
  position: relative;
  overflow: hidden;
}

.cta-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  padding: 1px;
  background: linear-gradient(
    110deg,
    rgba(255, 88, 42, 0.28) 0%,
    transparent 40%,
    rgba(41, 205, 255, 0.16) 100%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

/* Ambient glow blob */
.cta-inner::after {
  content: '';
  position: absolute;
  width: 360px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 88, 42, 0.12), transparent 70%);
  top: -40px;
  left: -60px;
  pointer-events: none;
}

.cta-copy { position: relative; flex: 1; }

.cta-copy h2 {
  font-size: clamp(1.8rem, 2.8vw, 3rem);
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.03em;
  max-width: 22ch;
}

.pricing-cta .btn-primary { position: relative; flex-shrink: 0; }

/* ── RESPONSIVE ─────────────────────────────────────────────── */

/* ≤ 1020px: hero becomes vertical, panel is full-width */
@media (max-width: 1020px) {
  .pricing-hero {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    position: static; /* un-sticky */
  }

  /* Keep plan grid as 3-col inside panel on tablet */
  .plan-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ≤ 820px: plan cards → single column, details → 1 col */
@media (max-width: 820px) {
  .plan-grid {
    grid-template-columns: 1fr;
  }

  .featured-badge {
    /* Reposition to top-right corner on stacked layout */
    left: auto;
    right: 20px;
    top: 20px;
    transform: none;
    border-radius: 999px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .cta-inner .btn-primary {
    width: 100%;
  }
}

/* ≤ 620px: tablet mid-range  */
@media (max-width: 620px) {
  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .section-intro h2 {
    max-width: 100%;
  }
}

/* ≤ 460px: small phones */
@media (max-width: 460px) {
  .pricing-hero {
    padding-left: 14px;
    padding-right: 14px;
  }

  .hero-copy,
  .pricing-panel {
    border-radius: 20px;
  }

  .plan-card {
    border-radius: 16px;
  }

  .pricing-cta {
    padding-left: 14px;
    padding-right: 14px;
  }

  .cta-inner {
    border-radius: 20px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .btn, .plan-card, .detail-card { transition: none; }
}
</style>