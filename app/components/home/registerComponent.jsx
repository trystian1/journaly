import React from 'react';
import TextInputComponent from '../general/inputComponent.jsx';

class LoginComponent extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  render() {
    return(
      <div className="login">
        <TextInputComponent
          tabIndex={this.props.tabIndex}
          icon="glyphicon glyphicon-asterisk"
          name="username"
          autofocus="true"
          label="Username"
          required="true"
          type="text"
          error={this.props.errors.username}
          placeholder="Username"
          value={this.props.registerData.username}
          onChange={this.props.onChange}/>
        <TextInputComponent
          tabIndex={this.props.tabIndex}
          icon="glyphicon glyphicon-asterisk"
          name="email"
          autofocus="true"
          label="Email"
          required="true"
          type="text"
          error={this.props.errors.email}
          placeholder="bob@builder.com"
          value={this.props.registerData.email}
          onChange={this.props.onChange}/>
        <TextInputComponent
          tabIndex={this.props.tabIndex}
          icon="glyphicon glyphicon-asterisk"
          name="password"
          autofocus="true"
          label="Password"
          required="true"
          type="password"
          error={this.props.errors.password}
          placeholder="Password"
          value={this.props.registerData.password}
          onChange={this.props.onChange}/>

        {this.props.registerErrors && <p className="bg-danger">{this.props.registerErrors}</p>}
        
        <button tabIndex={this.props.tabIndex} onClick={this.props.onClickRegister} className="btn btn-lg btn-block btn-info">Register</button>
        <button tabIndex={this.props.tabIndex} onClick={this.props.onClickCancel} className="btn btn-lg btn-block btn-cancel-home">Back</button>

    </div>

    )
  }
}

export default LoginComponent;
