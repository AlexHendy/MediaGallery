import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';

function Header () {
    return (
        <AppBar position="static" className='top-bar'>
            <Toolbar>
                <CameraIcon style={{ marginRight: 10 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    Media Gallery
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;