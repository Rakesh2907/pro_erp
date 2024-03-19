const db = require("../db/mysql_connection_pool");

async function getMenuDetails(id) {
    try {
        const [rows, fields] = await db.query('SELECT * FROM pro_menus WHERE module_id = ?', [id]);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

module.exports = {
    getMenuDetails
};