import React from 'react';

class Journeys extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
  }

  createJournal() {

  }

  render() {
    // Title input tracker
    let titleInput;
    // return JSX
    return(
      <section className="container">
        <h2 className="title">Journeys</h2>
        <button onClick={this.createJournal.bind(this)} className="btn btn-lg btn-block btn-action"><span className="glyphicon glyphicon-pencil"></span> Begin your own Journey  </button>
      </section>
    )
  }
}

export default Journeys;
