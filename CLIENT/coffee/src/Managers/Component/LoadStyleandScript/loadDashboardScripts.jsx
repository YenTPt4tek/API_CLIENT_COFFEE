// ...existing code...
import { ensureScript, loadScriptsSequential } from "../../../Define/assetLoader";

export const loadDashboardScripts = async () => {
    const base = process.env.REACT_APP_ADMIN_PATH;
    const vendorPaths = [
        "vendor/bootstrap/js/bootstrap.bundle.min.js",
        "vendor/apexcharts/apexcharts.min.js",
        "vendor/chart.js/chart.umd.js",
        "vendor/echarts/echarts.min.js",
        "vendor/quill/quill.min.js",
        "vendor/simple-datatables/simple-datatables.js",
        "vendor/tinymce/tinymce.min.js",
        "vendor/php-email-form/validate.js",
    ].map(p => `${base}/${p}`);

    const mainScript = `${base}/js/main.js`;

    console.groupCollapsed("📦 Loading Dashboard Scripts...");
    console.time("⏱️ Dashboard scripts loaded in");

    try {
        // 🔹 Load từng script vendor theo thứ tự
        await loadScriptsSequential(vendorPaths, { async: false });
        console.log("✅ Vendor scripts loaded successfully");

        // 🔹 Load script chính
        await ensureScript(mainScript, { async: false });
        console.log("✅ Main dashboard script loaded");
    } catch (error) {
        console.error("❌ Error loading dashboard scripts:", error);
    } finally {
        console.timeEnd("⏱️ Dashboard scripts loaded in");
        console.groupEnd();
    }
};
export default loadDashboardScripts;
// ...existing code...