const logger = (req, res, next) => {
    console.log(`Middleware --- ${req.method} ${req.url}`)
    next();
}

export default logger;