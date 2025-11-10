// ...existing code...
// utility nhỏ tái sử dụng để chèn script/link và tránh chèn 2 lần
const __cache = (window.__asset_loader_cache = window.__asset_loader_cache || {});

export function ensureScript(src, { async = false } = {}) {
    if (__cache[src]) return __cache[src];
    __cache[src] = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            if (existing.getAttribute("data-loaded") === "true") return resolve(existing);
            existing.addEventListener("load", () => resolve(existing), { once: true });
            existing.addEventListener("error", (e) => reject(e), { once: true });
            return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = async;
        s.onload = () => {
            s.setAttribute("data-loaded", "true");
            resolve(s);
        };
        s.onerror = (e) => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(s);
    });
    return __cache[src];
}

export function ensureStylesheet(href) {
    if (__cache[href]) return __cache[href];
    __cache[href] = new Promise((resolve, reject) => {
        const existing = document.querySelector(`link[rel="stylesheet"][href="${href}"]`);
        if (existing) {
            if (existing.getAttribute("data-loaded") === "true") return resolve(existing);
            existing.addEventListener("load", () => resolve(existing), { once: true });
            existing.addEventListener("error", (e) => reject(e), { once: true });
            return;
        }
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;
        l.onload = () => {
            l.setAttribute("data-loaded", "true");
            resolve(l);
        };
        l.onerror = (e) => reject(new Error(`Failed to load ${href}`));
        document.head.appendChild(l);
    });
    return __cache[href];
}

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

export function loadScriptsSequential(urls, opts = { async: false }) {
    // chạy tuần tự giữ thứ tự (await từng ensureScript)
    return urls.reduce((p, url) => p.then(() => ensureScript(url, opts)), Promise.resolve());
}

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
// ...existing code...