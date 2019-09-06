import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import BusRouteMap from './busRouteMap';
import PopulationDensity from './populationDensity';
import BusRouteMapSpecial from './busRouteMapSpecial';
import DrawPolygonOnMap from './drawPolygonOnMap';
import BaiduMap from './baidumap';

ReactDOM.render(<BaiduMap />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();