const db = require("../db/mysql_connection_pool");

async function getMenuDetails(id) {
    try {
        const [rows, fields] = await db.query('SELECT * FROM pro_menus WHERE module_id = ? AND (parent_menu_id = ? OR parent_menu_id IS NULL) ORDER BY menu_order ASC', [id, null]);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function getSubMenuDetails(parent_menu_id) {
    try {
        const [rows, fields] = await db.query('SELECT * FROM pro_menus WHERE parent_menu_id = ? AND parent_menu_id IS NOT NULL ORDER BY menu_order ASC', [parent_menu_id]);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function getRoutesDetails() {
    try {
        const [rows, fields] = await db.query('SELECT url, components_page FROM pro_menus WHERE components_load = ? AND is_deleted = ? ORDER BY menu_order ASC', ['1','0']);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

module.exports = {
    getMenuDetails,
    getSubMenuDetails,
    getRoutesDetails
};