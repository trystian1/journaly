import React from 'react';
import TextInputComponent from '../general/inputComponent.jsx';

class JourneyComponent extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  render() {

    return(

      <article className="entry-wrap">
        <div><h3><i className="glyphicon glyphicon-flag"></i> ENTRY #{this.props.number}</h3></div>
        <img src={this.props.data.photo}></img>
        <p className="lead entry-description"><i className="glyphicon glyphicon-tent"></i> {this.props.data.address}</p>
        <p className="lead entry-description"><i className="glyphicon glyphicon-book"></i>{this.props.data.description}</p>
      </article>

    )
  }
}


JourneyComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default JourneyComponent;
