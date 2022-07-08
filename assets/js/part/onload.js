import * as marker from './marker.js'
import * as handler from './handler.js'
import * as layout from './layout.js'
import * as globalEvent from './globalEvent.js'


console.warn = () => { }
export let marker01, marker02, marker03
export let handler01, handler02, handler03
onload = () => {
   marker01 = marker.markerFn({
      'name': 'marker01',
      'markerTextImg': './assets/img/text01.png',
      'position': {'x': -1.8, 'y': 0.3, 'z': 1.2},
   })
   marker02 = marker.markerFn({
      'name': 'marker02',
      'markerTextImg': './assets/img/text02.png',
      'position': {'x': 2.6, 'y': -0.4, 'z': 0},
   })
   marker03 = marker.markerFn({
      'name': 'marker03',
      'markerTextImg': './assets/img/text03.png',
      'position': {'x': 1, 'y': 0.3, 'z': 0},
   })
   handler01 = handler.handlerFn({
      'name': 'handler01',
      'objName': 'pcal',
      'marker': marker01,
      'camPosition': {'x': -4, 'y': 1.0, 'z': 3.4},
      'layout': layout.layout01,
   })
   handler02 = handler.handlerFn({
      'name': 'handler02',
      'objName': 'pc',
      'marker': marker02,
      'camPosition': {'x': 3, 'y': 0.5, 'z': 5},
      'layout': layout.layout02,
   })
   handler03 = handler.handlerFn({
      'name': 'handler03',
      'objName': 'pbt',
      'marker': marker03,
      'camPosition': {'x': 4, 'y': 0.5, 'z': 0},
      'layout': layout.layout03,
   })
   globalEvent.globalEventFn()
}