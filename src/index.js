import React from 'react';import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

var NewComponent = React.createClass({
  render: function() {
    return (
      <div>
        <div className="navbar">
          <a href="#">NeXphos</a>
          <div className="subnav">
            <button className="subnavbtn">Profile <i className="fa fa-caret-down" /></button>
            <div className="subnav-content">
              <a href="#bring">View Profile</a>
              <a href="#deliver">Logout</a>
            </div>
          </div>
          <div className="subnav">
            <button className="subnavbtn">Instance Module <i className="fa fa-caret-down" /></button>
            <div className="subnav-content">
              <a href="#">Add Instance</a>
              <a href="#">Delete Instance</a>
              <a href="#">Database</a>
              <a href="#">Financial System</a>
            </div>
          </div>
        </div>
        <div className="instance-table">
          <a href="#" /><div className="instance"><a href="#">
              <div className="instance-text">
                <h1>Instance 1</h1>
                <p><strong>ID : </strong>de8q9dn9</p>
                <p><strong>IP address : </strong>192.168.77.43</p>
                <p><strong>Status : </strong>Utilized</p>
              </div>
            </a>
          </div>
          <div className="instance">
            <a href="#"><div className="instance-text">
                <h1>Instance 2</h1>
                <p><strong>ID : </strong>324iorn</p>
                <p><strong>IP address : </strong>10.0.8.55</p>
                <p><strong>Status : </strong>Overutilized</p>
              </div>
            </a>
          </div>
          <div className="instance">
            <a href="#"><div className="instance-text">
                <h1>Instance 3</h1>
                <p><strong>ID : </strong>f32fplr4</p>
                <p><strong>IP address : </strong>172.168.9.98</p>
                <p><strong>Status : </strong>Underutilized</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
});
