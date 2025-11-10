// ...existing code...
import { ensureStylesheet } from "../../../Define/assetLoader";

 const loadLoginStyles = () => {
    const base = process.env.REACT_APP_ADMIN_PATH ;
    const paths = [
        "css/style_login.css"

    ].map(p => `${base}/${p}`);
    return Promise.all(paths.map(h => ensureStylesheet(h))); // ensureStylesheet có cache => load 1 lần
};


export default loadLoginStyles;
// ...existing code...
