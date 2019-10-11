import React, { Component } from 'react'
import { Button, Input } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import AuthService from '../../services/auth-api-service';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  // handleSubmitBasicAuth = ev => {
  //   ev.preventDefault()
  //   const { user_name, password } = ev.target

  //   const token = TokenService.makeBasicAuthToken(user_name.value, password.value)
  //   TokenService.saveAuthToken(token)

  //   user_name.value = ''
  //   password.value = ''
  //   this.props.onLoginSuccess()
  // }
  handleSubmitJWTAuth = e => {
    e.preventDefault();

    const { user_name, password } = e.target;
    AuthService.postAuth({user_name: user_name.value, password: password.value})
      .then(token => {
        TokenService.saveAuthToken(token.authToken)
        user_name.value = ''
        password.value = ''
        this.props.onLoginSuccess()
      })
      .catch(error => {
        user_name.value = ''
        password.value = ''
        this.setState({
          error: error.message
        });
      })
    
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJWTAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}
