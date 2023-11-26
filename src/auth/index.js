import { reactive } from 'vue'


export default reactive({
  user: {
    authenticated: false
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.authenticated = false;
  }
});