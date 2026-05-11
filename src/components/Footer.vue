<template>
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand-name">ECOSOFT</div>
        <p class="footer-brand-desc">
          A creative studio at the crossroads of technology, storytelling, and environmental impact. Building worlds worth saving.
        </p>
        <div class="footer-socials">
          <a href="#" class="footer-social-icon">▶</a>
          <a href="#" class="footer-social-icon">♪</a>
          <a href="#" class="footer-social-icon">⬡</a>
          <a href="#" class="footer-social-icon">◈</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <ul class="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#universe">Universe</a></li>
          <li><a href="#games">Games</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#devlog">Devlog</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Universe</div>
        <ul class="footer-links">
          <li><a href="#">Comic Book</a></li>
          <li><a href="#">Concept Art</a></li>
          <li><a href="#">World Wiki</a></li>
          <li><a href="#">Characters</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Company</div>
        <ul class="footer-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press Kit</a></li>
          <li><a href="mailto:hello@ecosoftgame.com">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2026 Ecosoft Interactive, Inc. — All rights reserved.</div>
      <div class="footer-address">5681 Beach Blvd, Buena Park, CA 90621 · hello@ecosoftgame.com</div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  z-index: 1;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  padding: 3rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand-name {
  font-family: 'Bangers', cursive;
  font-size: 1.8rem;
  letter-spacing: 3px;
  color: var(--green);
  margin-bottom: 0.8rem;
}

.footer-brand-desc {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.footer-socials {
  display: flex;
  gap: 0.6rem;
}

.footer-social-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  color: var(--muted);
}

.footer-social-icon:hover {
  border-color: var(--green);
  color: var(--green);
  background: rgba(15,255,108,0.05);
}

.footer-col-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.2rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-links a {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover { color: var(--green); }

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.footer-copy {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: var(--muted);
  letter-spacing: 1px;
}

.footer-address {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.3);
}

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
}
</style>
