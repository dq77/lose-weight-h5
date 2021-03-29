import axios from 'axios'
const BASE_URL = process.env.REACT_APP_URL
// 创建axios实例
const Request = axios.create({
  baseURL: BASE_URL
})
export default Request