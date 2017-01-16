import React from 'react';
import TextInputComponent from '../general/inputComponent.jsx';
import TextAreaComponent from '../general/TextAreaComponent.jsx';
import { connect } from 'react-redux';
import * as entryActions from '../../actions/entryActions';

class CreateEntry extends React.Component{
  constructor(props){
    // Pass props back to parent
    super(props);
    this.state = {
      entry: {
        photo: '',
        title:'',
        description: '',
        address: '',
        lat: '',
        lng: ''
      },
      errors: {
        desription:'',
        address: ''
      },
      errorMessages: [],
      snappedImage: null,
    }
  }

  componentWillUnmount() {
    var googleMapsScript = document.getElementById('google-maps-script');
    googleMapsScript.parentNode.removeChild(googleMapsScript);
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.entry && nextProps.entry.entryData) {
      this.context.router.push('/journey/' + this.props.journey.id);
    }

  }

  componentDidMount() {

    let _this = this,
        script = document.createElement('script');

    if (!document.getElementById('google-maps-script')) {
      script.setAttribute('id', 'google-maps-script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDP8p3kVZe096Y9s7lCwcHOQoYjDJ_Y6rE&libraries=places&callback=initMap');
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    this.startVideo();

    window.initMap = () => {

      var latlng = new google.maps.LatLng(52.2616391, 4.7693348);

      _this.markers = [];

      _this.map = new google.maps.Map(_this.refs.map, {
        center: latlng,
        zoom: 18
      });

      navigator.geolocation.getCurrentPosition(_this.onGetPosition.bind(_this));

      google.maps.event.addListener(_this.map, 'click', function(event) {
        _this.placeMarker(event.latLng);
      });

    }

  }

  startVideo() {
    let  video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    });
  }

  placeMarker(latlng) {
    var _this = this;

    this.state.entry.lat = latlng.lat();
    this.state.entry.lng = latlng.lng();
    this.setState({entry: this.state.entry});

    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    this.markers = [];

    var marker = new google.maps.Marker({
      map: this.map,
      position: latlng
    });

    this.getLocationName(latlng);
    this.markers.push(marker)
  }

  onGetPosition(position) {

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    this.placeMarker(latLng);
    this.map.panTo(latLng);

  }

  getLocationName(latlng) {

    let _this = this,
        geocoder = new google.maps.Geocoder;

    geocoder.geocode({'location': latlng}, function(results, status) {

      _this.state.entry.address = results[0].formatted_address;
      _this.setState({entry: _this.state.entry})

    });
  }

  saveEntry() {
    if (this.entryIsValid()) {
      let data = this.state.entry;
      data.journeyId = this.props.journey.id;
      this.props.saveEntry(data)
    }
  }

  entryIsValid() {
    let isValid = true,
        errorMessages = [];

    if (!this.state.entry.description || this.state.entry.description == '') {
      isValid = false;
      this.state.errors.description = 'Please Enter a description';
    } else {
      this.state.errors.description = null;
    }

    if (!this.state.entry.address || this.state.entry.address == '') {
      isValid = false;
      this.state.errors.address = 'Please Enter a location';
    } else {
      this.state.errors.address = null;
    }

    if (!this.state.entry.photo) {
      isValid = false;
      errorMessages.push('Please take a picture for your entry');
    }

    if (!this.state.entry.lat || !this.state.entry.lng) {
      isValid = false;
      errorMessages.push('Please select a location, you must be somewhere');
    }

    this.setState({
      errors: this.state.errors,
      errorMessages: errorMessages
    });

    return isValid;
  }

  retrySnapPhoto() {

    var _this = this;

    this.state.entry.photo = null;
    this.setState({entry: this.state.entry});
    setTimeout(function() {
      _this.startVideo();
      _this.updateVideoComponent();
    }, 500)
  }

  onSnapPhoto() {

    let  video = document.getElementById('video');
    let  canvas = document.getElementById('canvas');
    let  context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    this.state.entry.photo = canvas.toDataURL("image/png");
    this.setState({entry: this.state.entry});

  }

  goBack() {
    this.context.router.push('/journey/' + this.props.journey.id);
  }

  goBackToJourneys() {
    this.context.router.push('/journeys');
  }

  onChange(event) {
    var field = event.target.name,
        value = event.target.value;

    this.state.entry[field] = value;

    this.setState({
      entry: this.state.entry
    });

  }

  render() {

    let journeyData = this.props.journey.journeyData
      ? this.props.journey.journeyData : {};

    const mapStyle = {
      width: '100%',
      height: 400,
    };

    return(
      <section className="container">
        <article className="journey-info">
          {this.props.journey.id && <span onClick={this.goBack.bind(this)} className="back"><i className="glyphicon glyphicon-arrow-left"></i>Back to Journey</span>}
          {!this.props.journey.id && <span onClick={this.goBackToJourneys.bind(this)} className="back"><i className="glyphicon glyphicon-arrow-left"></i>Back to Journeys</span>}
          {this.props.journey.id && <h2>{this.props.user.displayName}s Journey </h2>}
        </article>
        <div className="entry-journey-wrap">
          {!this.props.journey.id
            && <button onClick={this.goBackToJourneys.bind(this)}
            className="btn btn-lg btn-block btn-danger-home">No Journey selected, go to Journeys screen</button>}
        </div>

        {this.props.journey.id && <article className="create-entry">
          <h3 className="sub-title"> Add an entry to {journeyData.title}</h3>
          <p className="lead"><i className="glyphicon glyphicon-info-sign"></i>{journeyData.description} </p>

          <div className='map-element' style={mapStyle} ref="map" ref="map">I should be a map!</div>
          <p className="bg-info"><i className="glyphicon glyphicon-info-sign"></i> The default location will be your current location, however you can click on the map to lie about your location. (We wont tell anyone)</p>
          <p>{this.state.entry.lat} {this.state.entry.lng}</p>

        <TextInputComponent
          name="address"
          label="Location"
          required="true"
          type="text"
          error={this.state.errors.address}
          placeholder="Current location"
          value={this.state.entry.address}
          onChange={this.onChange.bind(this)}
        />

        <TextAreaComponent
          name="description"
          label="Description"
          required="true"
          type="text"
          error={this.state.errors.description}
          placeholder="Write an short summart of your Journey"
          value={this.state.entry.description}
          onChange={this.onChange.bind(this)}
        />
        <div className="label-wrap">
          Take a photo at your location!
        </div>
        <div>
          {!this.state.entry.photo && <video width="400" height="400" id="video" autoPlay></video>}
          {this.state.entry.photo && <img  width="400" height="400" src={this.state.entry.photo}></img>}
          <canvas id="canvas" width="400" height="400"></canvas>
          {!this.state.entry.photo && <button onClick={this.onSnapPhoto.bind(this)} className="btn btn-lg btn-block btn-photo" id="snap">
            <i className="glyphicon glyphicon-camera"></i>  Snap Photo (Say cheeesseee)</button>}
          {this.state.entry.photo && <button onClick={this.retrySnapPhoto.bind(this)} className="btn btn-lg btn-block btn-photo" id="snap"><i className="glyphicon glyphicon-refresh"></i> Not happy? Take another</button>}
        </div>

        <p className="lead"><i className="glyphicon glyphicon-heart"></i> Happy with the result ?? Add your entry to your journey </p>

        {this.state.errorMessages.map((value, i) =>
          <p key={i} className="bg-danger">{value}</p>
        )}

        <button onClick={this.saveEntry.bind(this)} className="btn btn-lg btn-block btn-action" id="snap">Save Entry</button>
      </article>}
      </section>

    )
  }
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    journey: state.journey,
    entry: state.entry
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    saveEntry: data => dispatch(entryActions.saveEntry(data))
  }
};

CreateEntry.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);
