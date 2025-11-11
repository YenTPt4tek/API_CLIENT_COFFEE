// ...existing code...
import { ensureStylesheet, ensureLinkImmediate } from "../../../Define/assetLoader";

export const loadDashboardHeadAssets = () => {
    document.title = "Managers Coffee";
    const base = process.env.REACT_APP_ADMIN_PATH;


    // extras: preconnect / google fonts / favicons (chèn 1 lần, không chờ load)
    const extras = [
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" },
        { rel: "icon", href: `${base}/img/favicon.png` },
        { rel: "apple-touch-icon", href: `${base}/img/apple-touch-icon.png` },
    ];

    const paths = [
        "vendor/bootstrap/css/bootstrap.min.css",
        "vendor/bootstrap-icons/bootstrap-icons.css",
        "vendor/boxicons/css/boxicons.min.css",
        "vendor/quill/quill.snow.css",
        "vendor/quill/quill.bubble.css",
        "vendor/remixicon/remixicon.css",
        "vendor/simple-datatables/style.css",
        "css/style.css",
    ].map(p => `${base}/${p}`);

    // chèn extras (preconnect, fonts, icons) nhưng chỉ 1 lần
    extras.forEach(ensureLinkImmediate);
    // chèn stylesheet và chờ load, chỉ 1 lần mỗi file
    return Promise.all(paths.map(h => ensureStylesheet(h)));
};
export default loadDashboardHeadAssets;
// ...existing code...