import React, { Component } from 'react';

function withEditTools(WrappedComponent, fileType) {
    return class extends Component {
        state = {
            name: ""
        }
    
        onChangeName(event) {
            this.setState({ name: event.target.value })
        }
    
        downloadURI(uri, name) {
            let link = document.createElement("a");
            link.download = name + fileType;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    
        toRoot() {
            this.props.actions.ResetStream();
            this.props.history.push('/');
        }
    
        render() {
            return <WrappedComponent 
                {...this.props} 
                name={this.state.name} 
                onChangeName={this.onChangeName.bind(this)} 
                toRoot={this.toRoot} 
                downloadURI={this.downloadURI}
            />
        }
    }
}

export default withEditTools;