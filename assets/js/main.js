import * as onload from './part/onload.js'
import * as object from './part/object.js'
import * as marker from './part/marker.js'
import * as handler from './part/handler.js'
import * as func from './part/func.js'
import * as layout from './part/layout.js'
import * as globalEvent from './part/globalEvent.js'
export const modelFile = './assets/model/car0529.glb'
export const shadowImg = './assets/img/shadow.png'
export const hdrImg = './assets/hdr/test.hdr'
export const cameraPosition = { 'x': 0, 'y': 0.5, 'z': 6 }
export const camLookAt = { 'x': 0, 'y': 0, 'z': 0 }
export const backgroundColor = '#f0f0f0'
export const markerColor = '#044C92'
export const markerColorHover = '#044C92'
export const markerColorVisited = '#999999'
export const btnScale = 1.2
export const btnScaleHover = 1.8
export const forwardDuration = 1.4
export const backwardDuration = 0.8
export const markerSize = 0.36
export const markerDuration = 0.2
export const shadowOpacity = 0.6
export const clock = new THREE.Clock()
export let scene, camera, renderer, controls, hLight, dLight, domEvents, objTotal, composer
const initFn = () => {
    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xf0f0f0, 7, 18);
    camera = new THREE.PerspectiveCamera(
        45,
        innerWidth / innerHeight,
        0.001,
        5000
    )
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.setClearColor(backgroundColor, 1.0)
    renderer.setSize(innerWidth, innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMapSoft = true
    renderer.gammaFactor = true;
    renderer.gammaFactor = 2.2;
    // renderer.sortObjects = false;
    // renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping,
        // renderer.toneMappingExposure = 1.4;
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap
        document.querySelector('#canvas').appendChild(renderer.domElement)
    window.addEventListener('resize', function () {
        renderer.setSize(this.innerWidth, this.innerHeight)
        camera.aspect = this.innerWidth / this.innerHeight
        camera.updateProjectionMatrix()
    })
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0, 0);
    controls.update();
    controls.enableZoom = true;
    controls.minAzimuthAngle = Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.minDistance = 3;
    controls.maxDistance = 7;
    controls.minPolarAngle = 0.8; // radians
    controls.maxPolarAngle = 1.5 // radians
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.5;
    controls.panSpeed = 0.8;
    controls.autoRotate = false
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY };
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };

    hLight = new THREE.HemisphereLight('#333333', 0.3)
    scene.add(hLight)

    dLight = new THREE.DirectionalLight('#fff', 0.5)
    dLight.position.set(1, 2, 1)
    dLight.castShadow = true
    //shadowCamera
    dLight.shadow.camera.top = 3
    dLight.shadow.camera.bottom = -3
    dLight.shadow.camera.left = -3
    dLight.shadow.camera.right = 3
    dLight.shadow.bias = 0.00001
    dLight.shadow.radius = 30
    dLight.shadow.needsUpdate = true
    dLight.shadow.mapSize.width = 2048
    dLight.shadow.mapSize.height = 2048
    dLight.shadow.camera.far = 6
    scene.add(dLight)
    // scene.add(new THREE.CameraHelper(dLight.shadow.camera))
    domEvents = new THREEx.DomEvents(camera, renderer.domElement)
    objTotal = new THREE.Group()
    scene.add(objTotal)
}
initFn()
// 바닥
const mapHeight = new THREE.TextureLoader().load("./assets/texture/floor3.jpg");
mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
mapHeight.repeat.set(30, 30);
mapHeight.anisotropy = 32;
mapHeight.encoding = THREE.sRGBEncoding;
const mesh = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshStandardMaterial
    ({ color: 0x666666, depthWrite: true, bumpMap: mapHeight, bumpScale: 0.1 }));
mesh.position.set(0, -0.77, 0)
// mesh.position.y = - 0.77;
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);
export let modelLoader, mixer, modelObj, manager
export let animates = []
const detailsMaterial = new THREE.MeshStandardMaterial({
    color: 0x698291, metalness: 0.5, roughness: 0.1
});
const detailsColorInput = document.getElementById('details-color');
detailsColorInput.addEventListener('input', function () {
    detailsMaterial.color.set(this.value);
});
const modelFn = (callback) => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    new THREE.RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .load(hdrImg, function (texture) {
            const envMap = pmremGenerator.fromEquirectangular(texture).texture
            // scene.background = envMap
            scene.environment = envMap
            texture.dispose()
            pmremGenerator.dispose()
            manager = new THREE.LoadingManager()
            modelLoader = new THREE.GLTFLoader(manager)
            modelLoader.load(modelFile, function (gltf) {
                modelObj = gltf.scene
                modelObj.name = 'modelObj'
                modelObj.scale.set(1, 1, 1)
                modelObj.position.set(0, -0.1, 0)
                modelObj.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                        child.material.side = THREE.DoubleSide;
                        child.material.transparent = true
                    }
                })
                modelObj.castShadow = true
                modelObj.receiveShadow = true
                modelObj.rotation.y = Math.PI / 2
                objTotal.add(modelObj)
                object.objectFn()

                modelObj.getObjectByName('cover_body').material = detailsMaterial;
                modelObj.getObjectByName('cover_door01').material = detailsMaterial;
                modelObj.getObjectByName('cover_door02').material = detailsMaterial;
                modelObj.getObjectByName('pc_back001').material = detailsMaterial;
            })
            manager.onLoad = function () {
                callback()
            }
        })
}
export let result
const modelCallbackFn = () => {
    result = modelObj.children.find(obj => obj.name === 'window')
    result.traverse(function (child) {
        if (child.isMesh) {
            child.material.side = THREE.DoubleSide;
            child.material.transparent = true;
            // child.premultipliedAlpha = true
            child.renderOrder = 1
            // child.alphaTest = 1;

        }
    })
}
modelFn(modelCallbackFn)
const update = () => {
    camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z)
    requestAnimationFrame(update)
    renderer.render(scene, camera)
    const delta = clock.getDelta()
    if (mixer) mixer.update(delta)
}
update()

if (window.matchMedia("(min-width:430px)").matches) {
    console.log("430px이상")
} else {
    // camera.position.set(-150, 30, 150)
    camera.zoom = 0.6;
    camera.updateProjectionMatrix()
}
// three.js 끝 
// 탭메뉴 중복 방지
const hd1 = document.querySelector(".hd1");
const hd2 = document.querySelector(".hd2");
const hd3 = document.querySelector(".hd3");
const tab01 = document.querySelector(".tab01");
const tab02 = document.querySelector(".tab02");
const tab03 = document.querySelector(".tab03");
tab01.addEventListener("click", () => {
    hd2.classList.add("on");
    hd3.classList.add("on");
})
tab02.addEventListener("click", () => {
    hd1.classList.add("on");
    hd3.classList.add("on");
})
tab03.addEventListener("click", () => {
    hd1.classList.add("on");
    hd2.classList.add("on");
})
// 탭메뉴
var tab = function (sMenuSelector, sTargetSelector) {
    this._nIndex = 0;
    this._setTargets(sTargetSelector);
    this._setMenu(sMenuSelector);
}
tab.prototype = {
    display: function (nIndex) {
        this._nIndex = nIndex;
        this._reset();
        this._aTargets[this._nIndex].className = "";
    },
    _reset: function () {
        for (var i = 0; i < this._aTargets.length; i++) {
            this._aTargets[i].className = "off";
        }
    },
    _setMenu: function (sMenuSelector) {
        var oSelf = this;
        this._aMenu = document.querySelectorAll(sMenuSelector);
        for (var i = 0; i < this._aMenu.length; i++) {
            this._aMenu[i]._nIndex = i;
            this._aMenu[i].onclick = function () {
                oSelf.display(this._nIndex);
            }
        }
    },
    _setTargets: function (sTargetSelector) {
        this._aTargets = document.querySelectorAll(sTargetSelector);
    }
};
new tab("#tabBtn a", "#tabs article")


