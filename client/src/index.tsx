import RX = require('reactxp');
import App = require('./views/App');

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
