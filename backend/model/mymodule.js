const db = require("../db/mysql_connection_pool");

async function getModuleDetails() {
    try {
        const [rows, fields] = await db.query('SELECT * FROM pro_modules WHERE is_deleted = ?',['0']);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

module.exports = {
    getModuleDetails
};