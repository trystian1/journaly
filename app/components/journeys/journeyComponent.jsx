import React from 'react';
import TextInputComponent from '../general/inputComponent.jsx';

class JourneyComponent extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  seeJourneyDetails() {
    this.context.router.push('/journey/' + this.props.data.id);
  }

  render() {
    return(
      <article className="journey-wrap">
        <div>
        <div>
          <h2 className="left journey-title">{this.props.data.journeyData.title}</h2>
        </div>
        <span className="user-data"><i className="glyphicon glyphicon-user"></i> {this.props.data.userData.createdBy}</span></div>
        <p className="lead journey-description"><i className="glyphicon glyphicon-info-sign"></i>{this.props.data.journeyData.description}</p>
        <button onClick={this.seeJourneyDetails.bind(this)} className="btn btn-block btn-lg journey-button">See details</button>
      </article>

    )
  }
}


JourneyComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default JourneyComponent;
