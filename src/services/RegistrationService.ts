import http from '@/core/HttpModule'
import {Registration} from '@/models/RegistrationModel';

class RegistrationService {
  get() {
    return http.get('/registration');
  }
  getById(id: number) {
    return http.get(`/registration/${id}`);
  }
  create(data: Registration) {
    return http.post('/registration', data);
  }
  put(data: Registration) {
    return http.put('/registration', data);
  }
  delete(id: number) {
    return http.delete(`/registration/${id}`);
  }
}

export default new RegistrationService();
