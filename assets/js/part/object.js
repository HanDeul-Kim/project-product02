import * as main from '../main.js'


export let shadow, mapImage, textureLoader
export const objectFn = () => {
   textureLoader = new THREE.TextureLoader()
   mapImage = textureLoader.load(main.shadowImg)
   shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.3, 2.6, 20),
      new THREE.MeshBasicMaterial({
         color: 0xffff00,
         side: THREE.DoubleSide,
         map: mapImage,
         transparent: true,
         opacity: main.shadowOpacity,
         depthWrite: false,
      })
   )
   shadow.rotation.x = Math.PI / 2
   shadow.position.y = -0.75
   main.objTotal.add(shadow)
}
