import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const SignupForm = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div>
        <h3>Sign Up</h3>
        <form 
          className="signupForm" 
          onSubmit={(event) => event.preventDefault()}>
          
          <label>Username: </label>
          <TextField
            placeholder="username"
            value={this.state.username}
            onChange={(event) => this.setState({username: event.target.value})}
          />
          <br/>
          <label>Password: </label>
          <TextField 
            placeholder="password"
            value={this.state.password}
            onChange={(event) => this.setState({password: event.target.value})}
          />
          <br/>
          <RaisedButton 
            type="submit" 
            label="Sign Up"
            secondary={true}
            onClick={this.onSignupSubmit}
            style={style}
          />
        </form>
      </div>
    );
  },

  onSignupSubmit() {
    
    //format data
    var user = {
      username: this.state.username,
      password: this.state.password,
    };

    //send post request with data
    request
      .post('auth/signup')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
        } else if (res.text === 'user already exists') {
          console.log(res.text);
        } else {
          console.log('Success!');
          browserHistory.push('/signin');
        }});

    //clear forms
    this.setState({username: '', password: ''});
  }
});

export default SignupForm;
