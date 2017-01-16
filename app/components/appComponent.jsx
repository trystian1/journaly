import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import * as loginActions from '../actions/loginActions';

class App extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
    this.state = {
      isOnline: null
    }
  }

  componentDidMount() {
    
    let _this = this;

    this.setState({
      isOnline: navigator.onLine
    });

    this.registerServiceWorker();
    setTimeout(function() {
      _this.props.authenticate();
    }, 500);

  }

  registerServiceWorker() {
    navigator.serviceWorker.register('../../sw.js');
  }

  logout() {
    this.props.logout();
  }

  render() {
    return(
      <div>
        <nav className="nav navbar-nav">
          {this.props.user.email && <span className="user-area"><i className="glyphicon glyphicon-user"></i>{this.props.user.displayName}</span>}
          {this.props.user.email && <span onClick={this.logout.bind(this)}><i className="glyphicon glyphicon-off"></i>Log-out</span>}
          {!this.props.user.email && <span><Link to="/home">Login</Link></span>}

        </nav>
        <main className="main container">
          {!this.state.isOnline && <p className="offline-message bg-danger">You seem offline, please check your connection</p>}
          {this.props.children}
        </main>

      </div>

    )
  }
}

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
    authenticate: data => dispatch(loginActions.authenticate(data)),
    logout: data => dispatch(loginActions.logout(data))
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(App);
