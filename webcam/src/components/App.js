import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Summary from './Summary.js'
import Header from './Header.js'
import CapturePhoto from './CapturePhoto.js'
import CaptureAudio from './CaptureAudio.js'
import CaptureVideo from './CaptureVideo.js'
import EditMedia from './EditMedia.js'
import Error from './Error.js'
import { serverAddress } from '../constants/Types'
import '../App.css';
import { store } from '../'
import { theme } from '../utils/Theme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class App extends Component {

	state = store.getState();

	componentDidMount() {
		//this.getExstingData();
	}

	getExstingData() {
		fetch(serverAddress)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(e => console.log(e))
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Header />
				<Switch>
					<Route exact path="/" component={Summary} />
					<Route exact path="/CapturePhoto" component={CapturePhoto} />
					<Route exact path="/CaptureAudio" component={CaptureAudio} />
					<Route exact path="/CaptureVideo" component={CaptureVideo} />
					<Route exact path="/EditPhoto/:photoId" render={(props) => {
						//const EditPhotoWithEditTools = withEditTools(EditPhoto, ".png");
						return this.state.photos && this.state.photos.length > 0
							? <EditMedia {...props} isPhoto />
							: <Redirect to="/" />
					}} />
					<Route exact path="/EditVideo/:videoId" render={(props) => {
						return this.state.photos && this.state.videoRecordings.length > 0
							? <EditMedia {...props} isVideo />
							: <Redirect to="/" />
					}} />
					<Route exact path="/EditAudio/:recordingId" render={(props) => {
						//const EditAudioWithEditTools = withEditTools(EditAudio, ".mp3");
						return this.state.audioRecordings && this.state.audioRecordings.length > 0
							? <EditMedia {...props} />
							: <Redirect to="/" />
					}} />
					<Route exact path="/Error" component={Error} />
				</Switch>
			</MuiThemeProvider>
		);
	}
}

export default App;
