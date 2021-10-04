import axios from 'axios';

const baseURL = 'https://8080-blush-mandrill-7o4f6lia.ws-us18.gitpod.io/api';
const headers = {
  'Content-Type': 'application/json'
};

export default axios.create({
  baseURL, headers
})
