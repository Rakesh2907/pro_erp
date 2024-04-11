const db = require("../db/mysql_connection_pool");

async function insertPostDetails(postDescription, fileNames) {
    try {
        const [rows, fields] = await db.query('INSERT INTO pro_timeline_post (post_description, post_files) VALUES (?, ?)', [postDescription, JSON.stringify(fileNames)]);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

module.exports = {
    insertPostDetails
}