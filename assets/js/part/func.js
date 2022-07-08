import * as main from '../main.js'
import * as layout from './layout.js'
import * as marker from './marker.js'
import * as object from './object.js'


export const showObjectsFn = () => {
   main.modelObj.children.forEach(child => {
      if(child.name === 'body') {
         child.traverse(function(item) {
            if(item.isMesh) {
               item.material.opacity = 1
               item.material.wireframe = false
            }
         })
      }
      if(child.name === 'window') {
         child.traverse(function(item) {
            if(item.isMesh) {
               item.material.transparent = true;
               item.material.side = THREE.DoubleSide;
               item.alphaTest = 1;
               item.material.reflectivity = 50;              
               item.material.opacity = 0.2
               item.material.wireframe = false
            }
         })
      }
      else {
         child.traverse(function(item) {
            if(item.isMesh) {
               item.material.opacity = 1
               item.material.wireframe = false
            }
         })
      }
   })
   object.shadow.material.opacity = main.shadowOpacity
}

export const showLayoutFn = layout => {
   layout.style.display = 'block'
   layout.addEventListener('click', function(evt) {
      const close = this.querySelector('.close')
      // if(evt.target === this || evt.target === close) {
      if(evt.target === close) {
         hideTextsFn()
         // animatesInitFn()
         hideLayoutsFn()
         showObjectsFn()
         gsap.to(main.camera.position, {
            x: main.cameraPosition.x,
            y: main.cameraPosition.y,
            z: main.cameraPosition.z,
            duration: main.backwardDuration,
            onComplete: () => {
               // controls.enabled = true
               showmarkersFn()
            },
         })
      }
   })
}

export const hideLayoutsFn = () => {
   layout.layouts.forEach(layout => (layout.style.display = 'none'))
}

export const hidemarkersFn = () => {
   // controls.enabled = false
   marker.markers.forEach(marker => main.scene.remove(marker))
   marker.markerTexts.forEach(markerText => main.scene.remove(markerText))
}

export const showmarkersFn = () => {
   marker.markers.forEach(marker => main.scene.add(marker))
   marker.markerTexts.forEach(markerText => main.scene.add(markerText))
}

let texts = []
export const addTextFn = (prop) => {
   const textImg = prop.textImg
   const textMap = new THREE.TextureLoader().load(textImg)
   const text = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({
         transparent: true,
         opacity: 1,
         alphaTest: 0.001,
         map: textMap,
      }),
   )
   text.geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3))
   text.position.copy(prop.position)
   text.position.y += 0.15
   texts.push(text)
   main.scene.add(text)
}


export const hideTextsFn = () => {
   texts.forEach(text => main.scene.remove(text))
}