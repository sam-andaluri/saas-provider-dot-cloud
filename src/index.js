import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Countly from 'countly-sdk-web';


window.Countly = Countly;
Countly.init({
    app_key: 'YOUR_COUNTLY_APP_KEY',
    url: 'http://YOUR_COUNTLY_INSTANCE_PUBLIC_IP',
});

// track sessions automatically
Countly.track_sessions();
// track pageviews automatically
Countly.track_pageview();

ReactDOM.render(

      <Router>
          <App />
      </Router>
,
  document.getElementById('root')

  );

