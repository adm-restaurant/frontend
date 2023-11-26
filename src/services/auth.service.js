import api from '@/config/api';

class AuthService {
  login(name, password) {
    return api.post('/auth/login', {
      name,
      password
    });
  }
}

export default new AuthService();