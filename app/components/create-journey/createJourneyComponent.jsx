import React from 'react';
import * as journeyActions from '../../actions/journeyActions';
import TextInputComponent from '../general/inputComponent.jsx';
import TextAreaComponent from '../general/TextAreaComponent.jsx';
import { connect } from 'react-redux';

class CreateJourney extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
    this.state = {
      journey: {
        title:'',
        description: '',
        entries: []
      },
      errors: {
        title:'',
        description: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.journey && nextProps.journey.journeyData) {
      this.context.router.push('/create-entry');
    }
  }

  createJourney() {

    if (this.dataIsValid()) {
      
      this.props.createJourney({
        user: this.props.user,
        journey: this.state.journey
      });

    }
  }

  goBack() {
    this.context.router.push('/journeys');
  }

  dataIsValid() {
    let valid = true;

    if (this.state.journey.title === '' || !this.state.journey.title) {
      valid = false;
      this.state.errors.title = 'Please fill in a title';
    }

    if (this.state.journey.description === '' || !this.state.journey.description) {
      valid = false;
      this.state.errors.description = 'Please fill in a description';
    }

    this.setState({errors: this.state.errors});

    return valid;
  }

  onChange(event) {
    var field = event.target.name,
        value = event.target.value;

    this.state.journey[field] = value;

    this.setState({
      journey: this.state.journey
    });

  }

  render() {
    return(
      <section className="container">
        <article>
          <span onClick={this.goBack.bind(this)} className="back"><i className="glyphicon glyphicon-arrow-left"></i>Back</span><h2 className="title">Create Journey</h2>
          <p className="lead text-big"><i className="glyphicon glyphicon-comment"></i> Hi {this.props.user.displayName}, It's time to start your Journey!</p>
          <p className="lead text-big"><i className="glyphicon glyphicon-tags"></i>  Pick a title for your Journey</p>
          <p className="lead text-big"><i className="glyphicon glyphicon-pencil"></i> Write one of your entries</p>
          <p className="lead text-big"><i className="glyphicon glyphicon-camera"></i> Take a picture</p>
        </article>

        <article className="create-journey">
          <TextInputComponent
            icon="glyphicon glyphicon-asterisk"
            name="title"
            autofocus="true"
            label="Journey"
            required="true"
            type="text"
            error={this.state.errors.title}
            placeholder="The title of your awesome journey"
            value={this.state.journey.title}
            onChange={this.onChange.bind(this)}/>

          <TextAreaComponent
              icon="glyphicon glyphicon-asterisk"
              name="description"
              autofocus="true"
              label="Description"
              required="true"
              type="text"
              error={this.state.errors.description}
              placeholder="Write an short summary of your Journey"
              value={this.state.journey.description}
              onChange={this.onChange.bind(this)}/>
        </article>

        <button onClick={this.createJourney.bind(this)} className="btn btn-lg btn-block btn-action">
          <i className="glyphicon glyphicon-plane"></i> Create Journey
        </button>
      </section>

    )
  }
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    journey: state.journey,
    user: state.user
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    createJourney: data => dispatch(journeyActions.createJourney(data))
  }
};

CreateJourney.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CreateJourney);
