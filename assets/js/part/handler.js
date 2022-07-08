import * as main from '../main.js'
import * as func from './func.js'
import * as object from './object.js'


export const handlerFn = prop => {
   main.domEvents.addEventListener(prop.marker, 'click', evt => {
      // animatesInitFn()
      func.hidemarkersFn()
      // const animate = animates.find(animate => animate._clip.name === prop.animate)
      gsap.to(main.camera.position, {
         x: prop.camPosition.x,
         y: prop.camPosition.y,
         z: prop.camPosition.z,
         duration: main.forwardDuration,
         onComplete: () => {
            func.showLayoutFn(prop.layout)
            // animate.play()
            let result = main.modelObj.children.filter(obj => obj.name !== prop.objName)
            result.forEach(child => {
               if(child.name === 'body') {
                  child.traverse(function(item) {
                     if(item.isMesh) {
                                 // item.material = new THREE.MeshStandardMaterial()
                        item.material.transparent = true;
                        item.material.opacity = 0.03
                        item.material.wireframe = true
                        item.renderOrder = 1
                        
                     }
                  })
               }
               else {
                  child.traverse(function(item) {
                     if(item.isMesh) {
                        item.material.transparent = true;
                        item.material.opacity = 0.03
                        item.material.wireframe = true
                        item.renderOrder = 1

                     }
                  })
               }
            })
            object.shadow.material.opacity = 0.0
            if(prop.name === 'handler01') {
               func.addTextFn({
                  textImg: './assets/img/t_wheel_cover_cap.png',
                  position: {
                     'x': 1.4, 'y': 0, 'z': 0.8
                  }
               })
               func.addTextFn({
                  textImg: './assets/img/t_rear_bumper_beam.png',
                  position: {
                     'x': -2.1, 'y': 0.4, 'z': 0
                  }
               })
               func.addTextFn({
                  textImg: './assets/img/t_center_fascia.png',
                  position: {
                     'x': 0.7, 'y': 0.3, 'z': 0.3
                  }
               })
            }
            else if(prop.name === 'handler02') {
               func.addTextFn({
                  textImg: './assets/img/t_head_lamp.png',
                  position: {
                     'x': 1.9, 'y': 0.12, 'z': 0.8
                  }
               })
               func.addTextFn({
                  textImg: './assets/img/t_center_fascia.png',
                  position: {
                     'x': 0.7, 'y': 0.3, 'z': 0.3
                  }
               })
               func.addTextFn({
                  textImg: './assets/img/t_rear_lamp.png',
                  position: {
                     'x': -2, 'y': 0.3, 'z': 0.6
                  }
               })
            }
            else if(prop.name === 'handler03') {
               func.addTextFn({
                  textImg: './assets/img/t_wiper.png',
                  position: {
                     'x': 0.7, 'y': 0.3, 'z': 0
                  }
               })  
               func.addTextFn({
                  textImg: './assets/img/t_head_lamp_bezel.png',
                  position: {
                  'x': 1.5, 'y': -0.3, 'z': 0
                  }
               })
            }
         },
      })
   })
}