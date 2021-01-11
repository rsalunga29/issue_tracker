import API from '@/api'

const prefix = '/user'

export default {
  login(email, password) {
    return API.post('/auth/login', { email: email, password: password })
  },

  register(name, email, password) {
    return API.post('/auth/register', { name: name, email: email, password: password })
  }
}
