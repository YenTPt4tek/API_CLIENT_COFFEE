// --- assetLoader.js ---
// ✅ Cache toàn cục tránh chèn trùng
const __cache = (window.__asset_loader_cache = window.__asset_loader_cache || {});

// 🧩 Đảm bảo load script (và chờ khi thực thi xong)
export function ensureScript(src, { async = false } = {}) {
  if (__cache[src]) return __cache[src];

  __cache[src] = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") return resolve(existing);
      existing.addEventListener("load", () => requestAnimationFrame(() => resolve(existing)), { once: true });
      existing.addEventListener("error", (e) => reject(e), { once: true });
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = async;

    s.onload = () => {
      s.setAttribute("data-loaded", "true");
      requestAnimationFrame(() => resolve(s)); // ✅ đảm bảo JS được thực thi
    };
    s.onerror = (e) => reject(new Error(`❌ Failed to load script: ${src}`));

    document.body.appendChild(s);
  });

  return __cache[src];
}

// 🧩 Đảm bảo load stylesheet (chờ trình duyệt apply xong)
export function ensureStylesheet(href) {
    if (__cache[href]) return __cache[href];

    __cache[href] = new Promise((resolve, reject) => {
        const existing = document.querySelector(`link[rel="stylesheet"][href="${href}"]`);

        if (existing) {
            if (existing.getAttribute("data-loaded") === "true") {
                // nếu CSS đã load → delay 1 frame để apply style
                return requestAnimationFrame(() => resolve(existing));
            }
            // nếu chưa load → add listener
            existing.addEventListener(
                "load",
                () => requestAnimationFrame(() => resolve(existing)),
                { once: true }
            );
            existing.addEventListener("error", (e) => reject(e), { once: true });
            return;
        }

        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;

        // timeout dự phòng 10s để tránh Promise treo
        const timeout = setTimeout(() => resolve(l), 10000);

        l.onload = () => {
            clearTimeout(timeout);
            l.setAttribute("data-loaded", "true");
            requestAnimationFrame(() => resolve(l)); // ✅ CSS đã apply xong
        };

        l.onerror = (e) => {
            clearTimeout(timeout);
            reject(new Error(`❌ Failed to load CSS: ${href}`));
        };

        document.head.appendChild(l);
    });

    return __cache[href];
}

// 🧩 Chèn link (font, icon...) không cần chờ load
export function ensureLinkImmediate({ rel, href, crossOrigin } = {}) {
  const exists = document.querySelector(`link[rel="${rel}"][href="${href}"], link[href="${href}"]`);
  if (exists) return exists;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (crossOrigin !== undefined) link.crossOrigin = crossOrigin;
  document.head.appendChild(link);
  return link;
}

// 🧩 Load JS theo thứ tự (giữ dependency)
export function loadScriptsSequential(urls, opts = { async: false }) {
  return urls.reduce((p, url) => p.then(() => ensureScript(url, opts)), Promise.resolve());
}

// 🧩 Đợi 1 biến global xuất hiện (VD: window.Chart, window.$, window.bootstrap)
export function waitForGlobal(name, { interval = 50, timeout = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (window[name]) return resolve(window[name]);
      if (Date.now() - start > timeout) return reject(new Error(`Timeout waiting for ${name}`));
      setTimeout(check, interval);
    };
    check();
  });
}
