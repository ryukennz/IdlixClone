module.exports = function errorHandlers(err, req, res, next) {

    // console.log(err, "<< CEK");
    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal server error'

    switch (err.name) {
        case `Forbidden`:
            statusCode = 403
            break;
        case `BadRequest`:
            statusCode = 400
            break;
        default:
    }

    res.status(statusCode).json({ message })
}