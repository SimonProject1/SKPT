(() => {
  'use strict';
  const VERSION = '1.0.1';
  const DEVELOPER = 'Simon Kiesler';

  function update(root = document) {
    root.querySelectorAll?.('.badge, .header-meta strong, .stb-version').forEach((element) => {
      if (/^Version\s+[\d.]+$/i.test(element.textContent.trim())) {
        element.textContent = `Version ${VERSION}`;
      }
    });

    root.querySelectorAll?.('footer.footer').forEach((footer) => {
      footer.classList.add('stb-footer');
      footer.innerHTML = `Bayer PLT Tools · <span class="stb-version">Version ${VERSION}</span> · Entwickelt von ${DEVELOPER}`;
    });
  }

  function run() {
    update();
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === 1) update(node.matches?.('footer.footer, .badge, .header-meta strong, .stb-version') ? node.parentElement || node : node);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
    setTimeout(() => update(), 300);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', run, { once: true })
    : run();
})();
