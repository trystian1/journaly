import React from 'react';

import LoginComponent from './loginComponent.jsx';
import RegisterComponent from './RegisterComponent.jsx';

import { connect } from 'react-redux';
import * as loginActions from '../../actions/loginActions';

class Home extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      registerData: {
        username: '',
        email: '',
        password: ''
      },
      registerErrors: {
        username: '',
        email: '',
        password: ''
      },
      loginData: {
        username: '',
        password: ''
      },
      loginErrors: {
        username: null,
        password: null
      },
      rendered: false
    }
  }

  componentDidMount() {
    this.setState({
      rendered: true
    });

    if (this.props.user && this.props.user.email) {
      this.context.router.push('/journeys');
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user && nextProps.user.email) {
      this.context.router.push('/journeys');
    }

  }

  toggleLogin() {
    this.setState({showLogin: !this.state.showLogin});
  }

  toggleRegister() {
    this.setState({showRegister: !this.state.showRegister});
  }

  onClickCancel() {
    this.showHome();
  }

  showHome() {
    this.setState({
      showRegister: false,
      showLogin: false
    });
  }

  goToJourneys() {
    this.context.router.push('/journeys');
  }

  onClickLogin() {
    //todo: login shizzle
    this.props.login(this.state.loginData);

  }

  onClickRegister() {
    if (this.registerDataIsValid()) {
      this.props.register(this.state.registerData);
    }
  }

  registerDataIsValid() {
    let isValid = true,
        emailRegEx = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

    if (!this.state.registerData.username
      || this.state.registerData.username === '') {
      isValid = false;
      this.state.registerErrors.username = 'please fill in a username';
    }

    if (!this.state.registerData.email
      || this.state.registerData.email === '') {
      isValid = false;
      this.state.registerErrors.email = 'please fill in a email';
    }

    if (!this.state.registerData.email.match(emailRegEx)) {
      isValid = false;
      this.state.registerErrors.email = 'please fill in a valid email adress';
    }

    if (!this.state.registerData.password
      || this.state.registerData.password === '') {
      isValid = false;
      this.state.registerErrors.password = 'please fill in a password';

    }
    this.setState({registerErrors: this.state.registerErrors});
    return isValid
  }

  onChangeRegister(event) {
    var field = event.target.name,
        value = event.target.value;

    this.state.registerData[field] = value;

    this.setState({
      registerData: this.state.registerData
    });
  }

  onChangeLogin(event) {
    var field = event.target.name,
        value = event.target.value;

    this.state.loginData[field] = value;

    this.setState({
      loginData: this.state.loginData
    });

  }

  render() {

    let registerClassName = this.state.showRegister ? 'register-is-shown' : 'register-not-shown'
    let loginClassName = this.state.showLogin ? 'register-is-shown' : 'register-not-shown'
    let wrapClass = this.state.rendered ? 'col-xs-12 home-wrap' : 'col-xs-12';
    let tabStatusRegister = this.state.showRegister ? '0' : '-1';
    let tabStatusLogin = this.state.showLogin ? '0' : '-1';


    return(
      <div>
        <section className="container row home">
          <h1>Journaly</h1>
          <div className={wrapClass}>
            <div className={loginClassName}>
              <LoginComponent
                loginData={this.state.loginData}
                loginErrors={this.props.user.loginErrors}
                tabIndex={tabStatusLogin}
                errors={this.state.loginErrors}
                onClickCancel={this.onClickCancel.bind(this)}
                onClickLogin={this.onClickLogin.bind(this)}
                onChange={this.onChangeLogin.bind(this)}/>
            </div>

                {!this.state.showLogin && !this.state.showRegister && <button onClick={this.toggleLogin.bind(this)} className="btn btn-lg btn-block btn-primary-home"> Login </button>}


                  {!this.state.showLogin && !this.state.showRegister &&
                    <button onClick={this.toggleRegister.bind(this)} className="btn btn-lg btn-block btn-info"> Register </button>}

                  {!this.state.showLogin && !this.state.showRegister &&
                    <button onClick={this.goToJourneys.bind(this)} className="btn btn-lg btn-block btn-action"> Journeys </button>}

                  <div className={registerClassName}>
                    <RegisterComponent
                      tabIndex={tabStatusRegister}
                      registerErrors={this.props.user.registerErrors}
                      registerData={this.state.registerData}
                      onClickRegister={this.onClickRegister.bind(this)}
                      onClickCancel={this.onClickCancel.bind(this)}
                      onChange={this.onChangeRegister.bind(this)}
                      errors={this.state.registerErrors}
                      />
                  </div>
              </div>
          </section>
        <div tabIndex="-1" className="background-pull-under"></div>
      </div>

    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.books
    user: state.user
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    login: data => dispatch(loginActions.login(data)),
    register: data => dispatch(loginActions.register(data))
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Home);
