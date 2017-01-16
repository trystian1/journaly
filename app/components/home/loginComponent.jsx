import React from 'react';
import TextInputComponent from '../general/inputComponent.jsx';

class LoginComponent extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  render() {
    // Title input tracker
    // return JSX
    return(
      <div className="login">
        <TextInputComponent
          tabIndex={this.props.tabIndex}
          name="username"
          autofocus="true"
          label="Email"
          required="true"
          type="text"
          error={this.props.errors.username}
          placeholder="Example@Example.com"
          value={this.props.loginData.username}
          onChange={this.props.onChange}/>
        <TextInputComponent
          tabIndex={this.props.tabIndex}
          name="password"
          autofocus="true"
          label="Password"
          required="true"
          type="password"
          error={this.props.errors.password}
          placeholder="Password"
          value={this.props.loginData.password}
          onChange={this.props.onChange}/>

        {this.props.loginErrors && <p className="bg-danger">{this.props.loginErrors}</p>}

        <button tabIndex={this.props.tabIndex} onClick={this.props.onClickLogin} className="btn btn-lg btn-block btn-info">Login</button>
        <button tabIndex={this.props.tabIndex} onClick={this.props.onClickCancel} className="btn btn-lg btn-block btn-cancel-home">Back</button>

    </div>

    )
  }
}

export default LoginComponent;
