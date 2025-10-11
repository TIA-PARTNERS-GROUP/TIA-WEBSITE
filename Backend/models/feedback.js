export default (db) => ({
    async addFeedback(userId, content) {
        try {
            await db.query(
                `
                INSERT INTO feedback (submitted_by_user_id, content)
                VALUES (?, ?)
                `,
                [userId, content]
            )
        }
        catch (error) {
            console.log("Error in feedback model: addFeedback");
            throw error;
        }
    }

})