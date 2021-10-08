import axios from 'axios';
class UtilService {
  getClientIp() {
    const http = axios.create({baseURL: 'https://api.ipify.org?format=json'})
    return http.get('', {params: {format: 'json'}}).then(res => res.data)
  }
  handleResponse(res: any) {
    return {data: res.data, error: false};
  }
  handleError() {
    return {data: null, error: true};
  }
}

export default new UtilService()
