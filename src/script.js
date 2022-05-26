import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import * as dat from "lil-gui"

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load("textures/matcaps/1.png")
const matcapTexture2 = textureLoader.load("textures/matcaps/2.png")
const matcapTexture3 = textureLoader.load("textures/matcaps/3.png")
const matcapTexture4 = textureLoader.load("textures/matcaps/4.png")
const matcapTexture5 = textureLoader.load("textures/matcaps/5.png")
const matcapTexture6 = textureLoader.load("textures/matcaps/6.png")
const matcapTexture7 = textureLoader.load("textures/matcaps/7.png")
const matcapTexture8 = textureLoader.load("textures/matcaps/8.png")
const matcapTexture9 = textureLoader.load("textures/matcaps/9.png")
const matcapTexture10 = textureLoader.load("textures/matcaps/10.png")

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  const material1 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture1 })
  const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
  const material3 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })
  const material4 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture4 })
  const material5 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
  const material6 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 })
  const material7 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 })
  const material8 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })
  const material9 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture9 })
  const material10 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture10 })

  // Material Array
  const matArr = [
    material1,
    material2,
    material3,
    material4,
    material5,
    material6,
    material7,
    material8,
    material9,
    material10,
  ]

  // Text
  const textGeometry = new TextGeometry("Donut Time...", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  })
  textGeometry.center()

  const text = new THREE.Mesh(textGeometry, material10)
  scene.add(text)

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)

  for (let i = 0; i < 300; i++) {
    let randMat = Math.floor(Math.random() * 9)
    const donut = new THREE.Mesh(donutGeometry, matArr[randMat])
    donut.position.x = (Math.random() - 0.5) * 20
    donut.position.y = (Math.random() - 0.5) * 20
    donut.position.z = (Math.random() - 0.5) * 20
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    const randScale = Math.random()

    const scale = randScale < 0.5 ? randScale + 0.4 : randScale
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
  }
})

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -1
camera.position.z = 1.3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
