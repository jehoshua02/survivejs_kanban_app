import React from 'react';
import Notes from './Notes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        { task: 'Learn Webpack' },
        { task: 'Learn React' },
        { task: 'Do Laundry' },
      ]
    };
  }

  render() {
    var notes = this.state.notes;
    return (
      <div>
        <button onClick={p.addItem.bind(this)}>+</button>
        <Notes items={notes} />
      </div>
    );
  }
}

var p = {
  addItem() {
    this.setState({
      notes: this.state.notes.concat([{
        task: 'New task'
      }])
    });
  }
};
