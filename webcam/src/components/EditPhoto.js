import React, { Component } from 'react';
import * as Actions from "../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, Grid, Button } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

class EditPhoto extends Component {
    render() {
        const photo = this.props.photo;

        return (
            <div style={{textAlign: "center", heigh:"100%", width:"100%", backgroundColor: grey[100] }}>
                <img style={{ maxHeight: "55%", maxWidth: "55%", marginTop: "20px" }} src={photo.src} alt={photo.id}/>
                {/* <Grid
                    container
                    alignItems="center"
                >
                    <Grid item>
                        <Card style={{ maxHeight: "55%", maxWidth: "55%", marginTop: "20px"}}>
                            <CardMedia
                                style={{
                                    height: "0",
                                    paddingTop: '56.25%',
                                }}
                                wide
                                image={photo.src}
                                title={this.props.name || "MyPhoto"}
                            />
                        </Card>
                    </Grid>
                </Grid> */}
                <br/>
                <TextField
                    id="outlined-email-input"
                    label="File Name"
                    value={this.props.name}
                    onChange={this.props.onChangeName}
                    margin="normal"
                    variant="outlined"
                />

                <div>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.props.toRoot.bind(this)}>
                                Home
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.props.downloadURI.bind(this, photo.src, this.props.name)}>
                                Download Photo
                            </Button>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        photo: state.photos[props.location.pathname.split('/')[2]],
        stream: state.stream
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPhoto);