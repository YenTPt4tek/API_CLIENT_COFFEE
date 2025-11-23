// ...existing code...
import { ensureScript, loadScriptsSequential } from "../../Define/assetLoader";

export const loadDashboardScripts = async (vendorPaths = []) => {
    const base = process.env.REACT_APP_ADMIN_SRC;
  

    // 👉 Chuẩn hóa path: thêm base vào từng script
    const fullVendorPaths = vendorPaths.map(p => `${base}/${p}`);

    const mainScript = `${base}/js/main.js`;

  

    try {
        // 🔹 Load từng script vendor theo thứ tự
        await loadScriptsSequential(fullVendorPaths, { async: false });
        // console.log("✅ Vendor scripts loaded successfully");

        // 🔹 Load script chính
        await ensureScript(mainScript, { async: false });
        //console.log("✅ Main dashboard script loaded");

    } catch (error) {
        console.error("❌ Error loading dashboard scripts:", error);

    } finally {
        // console.timeEnd("⏱️ Dashboard scripts loaded in");
        console.groupEnd();
    }
};

export default loadDashboardScripts;
// ...existing code...
