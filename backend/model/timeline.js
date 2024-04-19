const db = require("../db/mysql_connection_pool");

async function insertPostDetails(postDescription, fileNames, userId) {
    try {
        // Check if fileNames is an array, if not, convert it to an array
        const filesArray = Array.isArray(fileNames) ? fileNames : [fileNames];

        const [rows, fields] = await db.query('INSERT INTO pro_timeline_post (post_description, post_files, created_by) VALUES (?, ?, ?)', [postDescription, JSON.stringify(filesArray), userId]);
        return rows;
    } catch (error) {
        console.error('Error inserting post details:', error);
        throw error;
    }
}

async function insertReplyDetails(replyDescription, postId, userId){
    try {
        const [rows, fields] = await db.query('INSERT INTO pro_post_reply (reply_description, post_id, created_by) VALUES (?, ?, ?)', [replyDescription, postId, userId]);
        return rows;
    } catch (error) {
        console.error('Error inserting reply details:', error);
        throw error;
    }
}

async function getPostDetails() {
    try {
        const [rows, fields] = await db.query('SELECT * FROM pro_timeline_post WHERE is_deleted = ? ORDER BY post_id DESC',['0']);
        return rows;
    }catch (error) {
        console.error('Error get post details:', error);
        throw error;
    }
}

module.exports = {
    insertPostDetails,
    getPostDetails,
    insertReplyDetails
}