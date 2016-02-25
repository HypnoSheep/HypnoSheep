import React from 'react';
import Header from './Header';

const App = React.createClass({
  render() {
    return(
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
});

export default App;
