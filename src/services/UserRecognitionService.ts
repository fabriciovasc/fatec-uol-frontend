import axios from 'axios';
import UtilService from '@/services/UtilService';

const API_URL = process.env.VUE_APP_ROOT_SERVICE_API || 'http://localhost:8000'

class UserRecognitionService {
  get(user_id: number) {
    return axios.get(`${API_URL}/service/duplicates/${user_id}`).then(UtilService.handleResponse).catch(UtilService.handleError);
  }
}

export default new UserRecognitionService();
