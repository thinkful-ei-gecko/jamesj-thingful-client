import config from '../config'

const AuthService = {
  postAuth(data) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Sign in failed - please try again!')
    })
  },

  createUser: user => {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Failed to create new user')
    })
  },
}

export default AuthService
