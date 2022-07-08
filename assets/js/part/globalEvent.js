import * as main from '../main.js'
import * as marker from './marker.js'


export const globalEventFn = () => {
   marker.markers.forEach(marker => {
      main.domEvents.addEventListener(marker, 'mouseover', evt => {
         document.body.style.cursor = 'pointer'
         evt.target.material.color = new THREE.Color(main.markerColorHover)
         gsap.to(evt.target.scale, {
            x: main.btnScaleHover,
            y: main.btnScaleHover,
            z: main.btnScaleHover,
            duration: main.markerDuration
         })
         console.log(marker.tooltips);
      })
      main.domEvents.addEventListener(marker, 'mouseout', evt => {
         document.body.style.cursor = 'default'
         if(evt.target.visited) {
            evt.target.material.color = new THREE.Color(main.markerColorVisited)
         }
         else {
            evt.target.material.color = new THREE.Color(main.markerColor)
         }
         gsap.to(evt.target.scale, {
            x: main.btnScale,
            y: main.btnScale,
            z: main.btnScale,
            duration: main.markerDuration
         })
      })
      main.domEvents.addEventListener(marker, 'click', evt => {
         evt.target.visited = true
         evt.target.material.color = new THREE.Color(main.markerColorVisited)
      })
   })
}