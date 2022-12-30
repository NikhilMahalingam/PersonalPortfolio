import * as T from 'three'; 
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


//Scene
const scene = new T.Scene;

//Create our sphere
const geometry = new T.SphereGeometry(3,64,64)
const material = new T.MeshStandardMaterial({
  color: "#8400ff",
})
const mesh = new T.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new T.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
scene.add(light)

//Camera
const camera = new T.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new T.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true

//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  
  //Update Camera
 
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()