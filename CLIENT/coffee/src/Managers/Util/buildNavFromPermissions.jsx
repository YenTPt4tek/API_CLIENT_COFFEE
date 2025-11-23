export const buildNavFromPermissions = (permissions) => {
    if (!Array.isArray(permissions)) return [];

    const iconMap = {
        1: "bi-people",
        2: "bi-box",
        3: "bi-wallet2",
        4: "bi-graph-up",
        default: "bi-circle"
    };

    const grouped = permissions.reduce((acc, p) => {
        const { feature_id, feature_name } = p.feature;

        // Nếu chưa có feature => tạo mới
        if (!acc[feature_id]) {
            acc[feature_id] = {
                id: feature_id,
                title: feature_name,
                icon: iconMap[feature_id] || iconMap.default,
                children: []
            };
        }

        // Push quyền vào children
        acc[feature_id].children.push({
            title: p.description,
            href: `managers/admin/${p.permission_name}`,
        });

        return acc;
    }, {});

    // Sort menu & children (optional)
    const sortByName = (a, b) => a.title.localeCompare(b.title);

    return Object.values(grouped)
        .map(feature => ({
            ...feature,
            children: feature.children.sort(sortByName)
        }))
        .sort(sortByName);
};
