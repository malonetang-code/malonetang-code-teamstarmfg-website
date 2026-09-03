(() => {
  const root = document.documentElement;
  const isEnglish = root.lang.toLowerCase().startsWith("en");
  root.dataset.siteThemePreview = "e";
  root.dataset.reviewConcept = "1";
  document.body.classList.add("site-theme-preview-active");
  mountKeyboardNavigationMode();
  mountProductHero();
  mountPageHeroReveal();
  cleanChineseInterfaceLabels();
  mountLanguageMenu();

  function mountKeyboardNavigationMode() {
    const attribute = "data-keyboard-navigation";
    const skipLink = document.querySelector(".skip-link");
    root.removeAttribute(attribute);
    if (document.activeElement === skipLink) skipLink.blur();
    document.addEventListener("keydown", (event) => { if (event.key === "Tab") root.setAttribute(attribute, "true"); }, true);
    document.addEventListener("pointerdown", () => root.removeAttribute(attribute), true);
    window.addEventListener("blur", () => root.removeAttribute(attribute));
  }

  function mountProductHero() {
    if (!/^\/(?:en\/)?products\/$/.test(window.location.pathname)) return;
    const hero = document.querySelector(".page-hero");
    const picture = hero?.querySelector(":scope > picture");
    const image = picture?.querySelector("img");
    if (!hero || !picture || !image) return;
    document.body.classList.add("product-hero-photo-sample");
    document.body.dataset.productHeroSample = "surface-inspection";
    picture.querySelectorAll("source").forEach((source) => source.remove());
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.src = "/images/web/process-20260725/06-surface-inspection-full.jpg";
    image.width = 1600;
    image.height = 1202;
    image.alt = "";
    image.decoding = "async";
    image.fetchPriority = "high";
  }

  function mountPageHeroReveal() {
    if (document.body.classList.contains("page-home")) return;

    const media = document.querySelector(".page-hero > picture");
    if (!media) return;

    media.classList.add("c1-page-hero-media-wipe");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const playReveal = () => {
      media.dataset.c1RevealRuns = String(Number(media.dataset.c1RevealRuns || "0") + 1);
      if (reducedMotion.matches) {
        media.classList.add("is-visible");
        return;
      }

      root.classList.add("c1-subpage-motion-ready");
      media.classList.remove("is-visible");
      void media.offsetWidth;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => media.classList.add("is-visible"));
      });
    };

    playReveal();
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) playReveal();
    });
  }

  function cleanChineseInterfaceLabels() {
    if (isEnglish) return;
    const hasLatin = (element) => /[A-Za-z]/.test(element.textContent || "");
    document.querySelectorAll(".eyebrow").forEach((label) => { if (hasLatin(label)) label.remove(); });
    document.querySelectorAll(".guide-route-label, .fp-why-e-heading > span, .fp-mega-intro > small").forEach((label) => { if (hasLatin(label)) label.remove(); });
    document.querySelectorAll(".quality-flow-step > b, .inspection-scope > b").forEach((label) => {
      const match = (label.textContent || "").trim().match(/^(\d{2})\s*\/\s*[A-Za-z]/);
      if (match) label.textContent = match[1];
    });
    const emailLabel = document.querySelector('label[for="rfq-email"]');
    if (emailLabel && /^Email\s*/.test(emailLabel.textContent || "")) {
      const textNode = Array.from(emailLabel.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode) textNode.nodeValue = "电子邮箱";
    }
    const errorCode = document.querySelector(".error-code");
    if (errorCode && /NOT FOUND/i.test(errorCode.textContent || "")) errorCode.textContent = "404";
  }

  function mountLanguageMenu() {
    const existing = document.querySelector(".language-menu");
    if (existing) { enhanceTrigger(existing); bindMenu(existing); return; }
    const legacyLink = document.querySelector(".nav-actions > .language-link");
    if (!legacyLink) return;
    const relative = window.location.pathname.replace(/^\/en\//, "/");
    const labels = isEnglish ? { aria: "Choose language", title: "Language", planned: "Planned" } : { aria: "English / 选择语言", title: "多语言", planned: "筹备中" };
    const menu = document.createElement("details");
    menu.className = "language-menu";
    const summary = document.createElement("summary");
    summary.setAttribute("aria-label", labels.aria);
    const panel = document.createElement("div");
    panel.className = "language-menu-panel";
    panel.innerHTML = `<strong>${labels.title}</strong><a href="${relative}" hreflang="zh-CN"${isEnglish ? "" : ' aria-current="page"'}><span>简体中文</span><small>ZH</small></a><a href="/en${relative}" hreflang="en"${isEnglish ? ' aria-current="page"' : ""}><span>English</span><small>EN</small></a><span class="is-disabled" aria-disabled="true"><span>Français</span><small>${labels.planned}</small></span><span class="is-disabled" aria-disabled="true"><span>Español</span><small>${labels.planned}</small></span>`;
    menu.append(summary, panel);
    legacyLink.replaceWith(menu);
    enhanceTrigger(menu);
    bindMenu(menu);
  }

  function enhanceTrigger(menu) {
    const summary = menu.querySelector("summary");
    if (!summary || summary.querySelector(".language-menu-icon")) return;
    summary.innerHTML = '<svg class="language-menu-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg><span class="language-menu-hint">' + (isEnglish ? "LANG" : "语言") + '</span><span class="language-menu-code">EN</span>';
  }

  function bindMenu(menu) {
    const summary = menu.querySelector("summary");
    menu.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu.open) { menu.open = false; summary?.focus(); } });
    document.addEventListener("click", (event) => { if (menu.open && !menu.contains(event.target)) menu.open = false; });
  }
})();
