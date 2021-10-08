import axios from 'axios';

const API_URL = process.env.VUE_APP_ROOT_API || 'http://localhost:8000/'

const baseURL = `${API_URL}api`;
const headers = {
  'Content-Type': 'application/json'
};

export default axios.create({
  baseURL, headers
})
