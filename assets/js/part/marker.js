import * as main from '../main.js'


export let marker
export let markers = []
export let markerTexts = []
export const markerFn = prop => {
   marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 30, 30),
      new THREE.MeshBasicMaterial({
         color: main.markerColor,
      })
   )
   marker.position.copy(prop.position)
   marker.scale.set(main.btnScale, main.btnScale, main.btnScale)
   marker.name = prop.name
   markers.push(marker)
   main.scene.add(marker)

   const markerTextImg = prop.markerTextImg
   const markerTextMap = new THREE.TextureLoader().load(markerTextImg)
   const markerText = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({
         transparent: true,
         opacity: 1,
         alphaTest: 0.1,
         map: markerTextMap,
      }),
   )
   markerText.geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3))
   markerText.position.copy(prop.position)
   markerText.position.y += 0.2
   markerTexts.push(markerText)
   main.scene.add(markerText)
   return marker
}
