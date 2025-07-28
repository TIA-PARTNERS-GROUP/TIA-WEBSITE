const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || 'Middleware --- An unexpected error occurred' }); 
}

export default errorHandler;