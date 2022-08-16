export function authHeader() {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('token'));

    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}