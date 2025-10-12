export default (db) => ({
    async addFeedback(name, email, content) {
        try {
            await db.query(
                `
                INSERT INTO feedback (name, email, content)
                VALUES (?, ?, ?)
                `,
                [name, email, content]
            )
        }
        catch (error) {
            console.log("Error in feedback model: addFeedback");
            throw error;
        }
    }

})