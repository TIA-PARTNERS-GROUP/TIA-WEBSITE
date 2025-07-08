export const manageConst = async (req, res) => {
    try {

    } catch (error) {
        console.error('', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to process request' });
    }
}