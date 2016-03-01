import React from 'react';
import EditableList from './EditableList';
import Paper from 'material-ui/lib/paper';

const Resource = React.createClass({
  save(data) {
    this.props.updateResource(
      Object.assign({}, this.props.resource, data)
    );
  },

  open(url) {
    window.open(url);
  },

  render() {
    const { resource, deleteResource } = this.props;
    const style = {
      margin: 5,
      padding: 10
    };

    return (
      <Paper style ={style} zDepth={3}>

        <EditableList resource={resource} update={this.save} remove={deleteResource}>

          <h3 
            style={{ display: 'inline-block', color: 'blue', 'text-decoration': 'underline', cursor: 'pointer'}} 
            content={resource.url} 
            editKey={'url'} 
            onClick={() => this.open(resource.url)}>
            {resource.url}
          </h3>

          <Paper
            style={{ padding: 10 }}
            zDepth={1}
            content={resource.description}
            editKey={'description'}
          >
            Description: {resource.description}
          </Paper>

        </EditableList>

      </Paper>
    );
  }
});

export default Resource;
