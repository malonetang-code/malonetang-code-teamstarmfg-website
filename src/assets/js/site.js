(function () {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        !isOpen ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel
      );
      mobileMenu.hidden = isOpen;
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuButton.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  document.querySelectorAll("[data-rfq-form]").forEach(function (form) {
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const language = document.documentElement.lang === "en" ? "en" : "zh";
      const idleLabel = submit.textContent;

      submit.disabled = true;
      submit.textContent = language === "en" ? "Sending..." : "正在发送...";
      status.className = "form-status";
      status.textContent = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Submission failed");

        form.reset();
        status.className = "form-status success";
        status.textContent = language === "en"
          ? "Inquiry sent. We will review the information and reply by email."
          : "询盘已发送，我们会核对资料并通过邮件回复。";
      } catch (error) {
        status.className = "form-status error";
        status.textContent = language === "en"
          ? "The form could not be sent. Please email info@teamstarmfg.com."
          : "表单暂未发送成功，请直接邮件联系 info@teamstarmfg.com。";
      } finally {
        submit.disabled = false;
        submit.textContent = idleLabel;
      }
    });
  });
})();
