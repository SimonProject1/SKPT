(() => {
  'use strict';
  const VERSION = '1.0.0';

  function updateVersionText(root = document) {
    root.querySelectorAll('.badge, .header-meta strong, .stb-version').forEach((element) => {
      const text = element.textContent.trim();
      if (/^Version\s+[\d.]+$/i.test(text)) {
        element.textContent = `Version ${VERSION}`;
      }
    });

    root.querySelectorAll('footer.footer').forEach((footer) => {
      const developer = 'Entwickelt von Simon Kiesler';
      footer.classList.add('stb-footer');
      footer.innerHTML = `Bayer PLT Tools · <span class="stb-version">Version ${VERSION}</span> · ${developer}`;
    });
  }

  function updateSupportVersion(root = document) {
    root.querySelectorAll('.stb-modal').forEach((modal) => {
      modal.dataset.appVersion = VERSION;
    });
  }

  function run() {
    updateVersionText();
    updateSupportVersion();

    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          updateVersionText(node.matches?.('footer.footer, .badge, .header-meta strong, .stb-version') ? node.parentElement || node : node);
          updateSupportVersion(node);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
