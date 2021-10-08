import http from '@/core/HttpModule'
import UtilService from '@/services/UtilService';

class ProfileService {
  get() {
    return http.get('/profile').then(UtilService.handleResponse).catch(UtilService.handleError);
  }
  getById(id: number) {
    return http.get(`/profile/${id}`).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
  delete(id: number) {
    return http.delete(`/profile/${id}`).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
}

export default new ProfileService();
