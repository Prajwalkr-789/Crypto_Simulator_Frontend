
const backendurl : string = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

exports = { backendurl };

// server sent events we have to implement this fetch the crypto data from the backend and send it to the client
// signin signup and auth for context api calls
// 