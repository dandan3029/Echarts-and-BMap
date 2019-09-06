import React, { Component } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import BMap from 'echarts/extension/bmap/bmap.js';  // 为了导入百度地图

class BusRouteMap extends Component {
    componentDidMount() {
        var busRouteMap = echarts.init(document.getElementById('busroutemap'));
        // 绘制图表'
        busRouteMap.title = '北京公交路线 - 百度地图';

        // 为给定 ID 的 user 创建请求
        // https://www.echartsjs.com/examples/data/asset/data/lines-bus.json
        axios.get('/api/data/asset/data/lines-bus.json')
            .then(function (response) {
                var data = response.data;
                console.log(data[0].length);
                // data 的数据结构
                // [
                //    [ 9,7,6,43,534],  //0: 84
                //    [1,2,3,9,4,5,6,7,8], // 1: 158, 104, 154
                //    ...
                //    [1,2,3,4,] // 1543: 104
                // ]  // 长度为1543 数组中的每一项代表一条线路
                var busLines = [].concat.apply([], data.map(function (busLine, idx) {
                    var prevPt;
                    var points = [];
                    for (var i = 0; i < busLine.length; i += 2) {
                        var pt = [busLine[i], busLine[i + 1]];  // 一个坐标点
                        if (i > 0) {
                            pt = [
                                prevPt[0] + pt[0],
                                prevPt[1] + pt[1]
                            ];
                        }
                        prevPt = pt;

                        points.push([pt[0] / 1e4, pt[1] / 1e4]);
                    }
                    return {
                        coords: points
                    };
                }));

                busRouteMap.setOption({
                    bmap: {
                        center: [116.46, 39.92],
                        zoom: 10,
                        roam: true,
                        mapStyle: {
                            styleJson: [{
                                'featureType': 'water',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#d1d1d1'
                                }
                            }, {
                                'featureType': 'land',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#f3f3f3'
                                }
                            }, {
                                'featureType': 'railway',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'highway',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#fdfdfd'
                                }
                            }, {
                                'featureType': 'highway',
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'arterial',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#fefefe'
                                }
                            }, {
                                'featureType': 'arterial',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#fefefe'
                                }
                            }, {
                                'featureType': 'poi',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'green',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'subway',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'manmade',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#d1d1d1'
                                }
                            }, {
                                'featureType': 'local',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#d1d1d1'
                                }
                            }, {
                                'featureType': 'arterial',
                                'elementType': 'labels',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'boundary',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#fefefe'
                                }
                            }, {
                                'featureType': 'building',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#d1d1d1'
                                }
                            }, {
                                'featureType': 'label',
                                'elementType': 'labels.text.fill',
                                'stylers': {
                                    'color': '#999999'
                                }
                            }]
                        }
                    },
                    series: [{
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        polyline: true,
                        data: busLines,
                        silent: true,
                        lineStyle: {
                            normal: {
                                color: '#c23531',
                                color: 'rgb(200, 35, 45)',
                                opacity: 0.2,
                                width: 1
                            }
                        },
                        progressiveThreshold: 500,
                        progressive: 200
                    }]
                })
                // // 获取百度地图实例，使用百度地图自带的控件
                // var bmap = echarts.getModel().getComponent('bmap').getBMap();
                // bmap.addControl(new BMap.MapTypeControl());
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return <div id="busroutemap" style={{"width": "2544px", "height": "1600px"}}></div>
    }
}

export default BusRouteMap;

// ak:  QfOXFy1x2c8H4NUUjbSzL3bLeoFOiSR3