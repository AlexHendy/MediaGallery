import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';

class Error extends Component {

    onClick(){
        this.props.history.push('/')
    }

    render() {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: '20px'
              }}>
            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                There was an issue when openning your camera.  Please check your permissions and try again.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={this.onClick.bind(this)}>
                Home
            </Button>
            </div>
        );
    }
}

export default Error;