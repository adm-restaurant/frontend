function AuthVerifyRouter(to, from, next) {
    const token = localStorage.getItem('token');
    if(token) {
        next();
    } else {
        next('/');
    }
}

export default AuthVerifyRouter;