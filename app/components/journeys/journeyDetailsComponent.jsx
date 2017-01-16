import React from 'react';
import TextInputComponent from '../general/inputComponent.jsx';
import EntryComponent from '../entries/EntryComponent.jsx';
import { connect } from 'react-redux';
import * as journeyActions from '../../actions/journeyActions';
import * as entryActions from '../../actions/entryActions';

class JourneyDetailsComponent extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  createEntry() {
    this.context.router.push('/create-entry');
  }

  goBackToJourneys() {
    this.context.router.push('/journeys');
  }

  goToLogin() {
    this.context.router.push('home');
  }

  componentDidMount() {
    if (this.props.user.email) {
      this.props.getJourney(this.props.routeParams.id);
      this.props.getEntries(this.props.routeParams.id);
    } else {
      this.props.getRecentJourney(this.props.routeParams.id);
    }
  }

  render() {
    let userData = this.props.journey.userData ? this.props.journey.userData : {};
    let journeyData = this.props.journey.journeyData ? this.props.journey.journeyData : {};

    return(
      <article>
        <span onClick={this.goBackToJourneys.bind(this)} className="back"><i className="glyphicon glyphicon-arrow-left"></i>Back to Journeys</span>
        <div className="journey-wrap">
          <h2 className="journey-title">{journeyData.title}</h2>
          <p className="lead text-big journey-description">
            <i className="glyphicon glyphicon-user"></i>
            <span className="user">{userData.createdBy}</span></p>
            <p className="lead journey-description">
              <i className="glyphicon glyphicon-info-sign"></i>
              {journeyData.description}</p>
        </div>



        {this.props.entries.data && Object.keys(this.props.entries.data).map((key, i) =>
              <EntryComponent
                key={i}
                data={this.props.entries.data[key].data}
                number= {i + 1}
                />
          )}
        {!this.props.user.email && <button onClick={this.goToLogin.bind(this)} className="btn btn-lg btn-block btn-danger">Please log in, to see and create entries</button>}
        {this.props.user.email && <button onClick={this.createEntry.bind(this)} className="btn btn-lg btn-block btn-action">Create new Entry</button>}
      </article>
    )
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    entries: state.entries,
    journey: state.journey
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getJourney: data => dispatch(journeyActions.getJourney(data)),
    getRecentJourney: data => dispatch(journeyActions.getRecentJourney(data)),
    getEntries: data => dispatch(entryActions.getEntries(data))
  }
};


JourneyDetailsComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(JourneyDetailsComponent);
