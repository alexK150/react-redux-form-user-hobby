import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import MyForm from './MyForm';

ReactDOM.render(
  <Provider store={store}>
    <div style={{padding: 15}}>
      <h2>My Form</h2>
      <MyForm/>
    </div>
  </Provider>,
  document.getElementById("root")
);
