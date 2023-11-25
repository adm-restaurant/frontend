import api from '@/config/api';

class AuthService {
  login(user) {
    return api.post('/auth/login', {
      name: user.name,
      password: user.password
    })
    .then(response => {
      if (response.data.jwt) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new AuthService();