import http from '@/core/HttpModule'

class ProfileService {
  get() {
    return http.get('/profile').then(res => res.data);
  }
  getById(id: number) {
    return http.get(`/profile/${id}`);
  }
  delete(id: number) {
    return http.delete(`/profile/${id}`);
  }
}

export default new ProfileService();
