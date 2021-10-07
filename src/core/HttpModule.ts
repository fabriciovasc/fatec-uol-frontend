import axios from 'axios';

const baseURL = 'https://8080-plum-dormouse-qwr6rh3l.ws-us18.gitpod.io/api';
const headers = {
  'Content-Type': 'application/json'
};

export default axios.create({
  baseURL, headers
})
