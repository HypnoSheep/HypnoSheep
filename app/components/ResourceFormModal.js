import React from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import TextField from 'material-ui/lib/text-field';

const ResourceForm = React.createClass({
  getInitialState() {
    return {
      url: '',
      isValidUrl: null
    }
  },

  handleSubmit() {
    const url = this.url.getValue();
    const description = this.description.getValue();
    this.props.handleResourceSubmit({ url, description });
    this.props.closeModal();
  },

  urlChange(e) {
    //Changes state and checks validation on each keystroke
    this.setState({ url: e.target.value })
    this.validateUrl(e);
  },

  validateUrl(e) {
    //Tests the entered url on each keystroke with regex to check if it's a valid url and
    //changes state based on validity, then uses this state when rendering the modal.
    const url = e.target.value;
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    const isValidUrl = urlregex.test(url);
    const urlError = isValidUrl ? null : "Invalid url, format should be http://www.google.com";
    this.setState({ urlError, isValidUrl });
  },

  render() {
    const buttons = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.isValidUrl}
        onTouchTap={() => {
          this.handleSubmit();
        }}
      />
    ];
    return (
      <Dialog
        title='New Resource'
        actions={buttons}
        modal={true}
        open={this.props.open}
        onRequestClose={this.handleClose}
      >

        <TextField
          style={{ margin: 10 }}
          floatingLabelText={'Website'}
          errorText={this.state.urlError}
          onChange={this.urlChange}
          ref={node => {
            this.url = node;
          }}
        />
        <TextField
          style={{ margin: 10 }}
          floatingLabelText={'Description'}
          ref={node => {
            this.description = node;
          }}
        />

      </Dialog>
    );
  }
});

export default ResourceForm;
