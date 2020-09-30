import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import grey from '@material-ui/core/colors/grey';
import { CardContent, CardMedia, CardActions, Card, Button, Grid, Typography, Divider } from '@material-ui/core';
import AudioCard from './AudioCard.js'

class Summary extends Component {
    state = {
        vin: ""
    }

    onClickPhoto() {
        this.props.history.push('/CapturePhoto')
    }

    onClickAudio() {
        this.props.history.push('/CaptureAudio')
    }

    onClickVideo() {
        this.props.history.push('/CaptureVideo')
    }

    renderImages(images) {
        return images.map((image, index) => {
            const photoNumber = index + 1;
            return <Grid item key={index} sm={6} md={4} lg={3}>
                <Card>
                    <CardMedia
                        style={{
                            height: "0",
                            paddingTop: '56.25%',
                        }}
                        square
                        image={image.src}
                        title={"Photo " + photoNumber}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h4">
                            Photo {photoNumber} of {this.props.photos.length}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.goToImage.bind(this, image)} id="goToImage">
                            View/Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        });
    }

    renderAudio(audioRecordings) {
        return audioRecordings.map((recording, index) =>
            <Grid item key={index} sm={5} md={3} lg={2}>
                <AudioCard recording={recording} index={index} audioRecordingsLength={this.props.audioRecordings.length} />
            </Grid>
        )
    }

    renderVideo(videoRecordings) {
        return videoRecordings.map((recording, index) =>
            <Grid item key={index} sm={12} md={6} lg={4}>
                <Card style={{ width: "340px" }}>
                    <video style={{ padding:'10px' }} width="320" height="240" controls>
                        <source src={recording.src}/>
                    </video>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h4">
                            Video {index + 1} of {videoRecordings.length}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.goToVideo.bind(this, recording)} id="goToImage">
                            View/Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    goToImage(photo) {
        this.props.history.push(`/EditPhoto/${photo.id}`);
    }

    goToVideo(recording) {
        this.props.history.push(`/EditVideo/${recording.id}`);
    }

    goToRecording(recording) {
        this.props.history.push(`/EditAudio/${recording.id}`);
    }

    render() {
        return (
            <div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <div style={{ paddingTop: "3%" }}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Welcome to Media Gallery!
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Take a photo, record a video, or record audio with any device and save it for later use!
                        </Typography>
                    </div>

                    <div>
                        <Grid container spacing={40} justify="center">
                            <Grid item>
                                <Button
                                    id="takePhotoButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onClickPhoto.bind(this)}>
                                    Take Photo
                            </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    id="recordAudioButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onClickAudio.bind(this)}>
                                    Record Audio
                            </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    id="recordVideoButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onClickVideo.bind(this)}>
                                    Record Video
                            </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div style={{ background: grey[100], padding: "1%", marginTop: "2%", marginBottom: "2%" }}>
                    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                        {this.props.photos.length !== 0
                            ? <div>
                                <p style={{ padding: "10px" }}>Your Photos:</p>
                                <Grid container spacing={40} className="photoList">
                                    {this.renderImages(this.props.photos)}
                                </Grid>
                            </div>
                            : <Typography variant="h6" color="textSecondary" paragraph style={{ marginTop: "2%", marginLeft: "1%" }}>
                                Your photos will appear here
                            </Typography>
                        }

                        <Divider style={{ marginTop: "2%" }} />

                        {this.props.audioRecordings.length !== 0
                            ? <div>
                                <p style={{ padding: "10px" }}>Your Audio Recordings:</p>
                                <Grid container spacing={40} className="audioList">
                                    {this.renderAudio(this.props.audioRecordings)}
                                </Grid>
                            </div>
                            : <Typography variant="h6" color="textSecondary" paragraph style={{ marginTop: "2%", marginLeft: "1%" }}>
                                Your recordings will appear here
                            </Typography>
                        }

                        <Divider style={{ marginTop: "2%" }} />

                        {this.props.videoRecordings.length !== 0
                            ? <div>
                                <p style={{ padding: "10px" }}>Your Video Recordings:</p>
                                <Grid container spacing={40}>
                                    {this.renderVideo(this.props.videoRecordings)}
                                </Grid>
                            </div>
                            : <Typography variant="h6" color="textSecondary" paragraph style={{ marginTop: "2%", marginLeft: "1%" }}>
                                Your recordings will appear here
                            </Typography>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        photos: state.photos,
        audioRecordings: state.audioRecordings,
        videoRecordings: state.videoRecordings
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);