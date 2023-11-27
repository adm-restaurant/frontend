import auth from "@/auth";

function AuthVerifyRouter(to, from, next) {
    const token = localStorage.getItem('token');
    if(token) {
        
        if (to.meta.role && to.meta.role !== auth.user.role) {
            next('/');
        }

        next();
    } else {
        next('/');
    }
}

export default AuthVerifyRouter;