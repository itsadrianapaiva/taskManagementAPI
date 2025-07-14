export function errorHandler(err, req, res, next) {

    const message = err.message || 'Internal Server Error';

    //Maps common error messages to HTTP status codes
    const status = 
        message === 'Email already exists' ? 409 : 
        message.startsWith('Missing') ? 400 :
        500;

    res.status(status).json({
        error: message
    });
}