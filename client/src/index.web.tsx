import RX = require('reactxp');

import App = require('./App');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => {
            console.log('Service Worker Registered');
        });
}

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
