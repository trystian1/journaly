import React from 'react';
import { connect } from 'react-redux';
import * as journeyActions from '../../actions/journeyActions';
import JourneyComponent from './journeyComponent.jsx';

class Journeys extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  componentDidMount() {

    if (!this.props.user.email) {
      this.props.getRecentJourneys();
    } else {
      this.props.getJourneys();
    }

  }

  createJournal() {
    this.context.router.push('/create-journey');
  }

  navigateToHome() {
    this.context.router.push('/home');
  }

  render() {
    // Title input tracker
    let titleInput;

    return(
      <section className="container">
        <h2 className="title">Journeys</h2>
        {this.props.user.email && <button
          onClick={this.createJournal.bind(this)}
          className="btn btn-lg btn-block btn-action">
          <span className="glyphicon glyphicon-pencil"></span> Begin your own journey {this.props.user.displayName}
        </button>}

        {!this.props.user.email && <button
          onClick={this.navigateToHome.bind(this)}
          className="btn btn-lg btn-block btn-danger-home">
          <span className="glyphicon glyphicon-remove"></span> You are not logged-in, please login
        </button>}

        {!this.props.user.email &&
          <p className="bg-danger">You are not logged in, here you will see the journeys of your last visit</p>
        }
        {!this.props.journeys.data &&
          <div className="loading-indicator">
            <div className="loading-entries loadingWrap">
              <span className="loading-world"><i className="glyphicon glyphicon-globe"></i></span>
              <div className="loading">Loading journeys......</div>
            </div>
          </div>}
        {this.props.journeys.data && Object.keys(this.props.journeys.data).map((key, i) =>
            <JourneyComponent
              key={i}
              data={this.props.journeys.data[key]}
              />
        )}
      </section>
    )
  }
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user,
    journeys: state.journeys
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getJourneys: data => dispatch(journeyActions.getJourneys(data)),
    getRecentJourneys: data => dispatch(journeyActions.getRecentJourneys(data))
  }
};

Journeys.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(Journeys);
