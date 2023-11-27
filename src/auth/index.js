import { reactive } from 'vue'


export default reactive({
  user: {
    authenticated: false,
    role: null
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.authenticated = false;
  }
});