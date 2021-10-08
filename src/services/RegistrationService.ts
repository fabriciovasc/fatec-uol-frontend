import http from '@/core/HttpModule'
import {Registration} from '@/models/RegistrationModel';
import UtilService from '@/services/UtilService';

class RegistrationService {
  get() {
    return http.get('/registration').then(UtilService.handleResponse).catch(UtilService.handleError);
  }
  getById(id: number) {
    return http.get(`/registration/${id}`).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
  create(data: Registration) {
    return http.post('/registration', data).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
  put(data: Registration) {
    return http.put('/registration', data).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
  delete(id: number) {
    return http.delete(`/registration/${id}`).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
}

export default new RegistrationService();
