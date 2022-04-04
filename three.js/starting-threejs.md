## start by installing three.js library

- npm install three
- add a canvas element
- import threejs library like so : `import * as THREE from "three"; `

# THEORY

### you'll always need three objects:

1. scene
2. camera
3. renderer

#### the scene

is like a container that holds all your objects, cameras and ligths.
in order to look inside the scene, we need a `camera`

use it like so => `const scene = new THREE.Scene(); `

#### the camera

there are many different cameras in threejs, but the one that we'll encounter the most is perspective camera, which is designed to mimic what human eyeballs would see

use it like so => `const camera = new THREE.PerspectiveCamera(); `

#### renderer

renders the graphics to the scene

### adding an object

#### geometry

the {x,y,z} points that makeup a shape

#### material

gives color, texture etc. is the wrapping paper for an object

#### mesh

combines geometry and material
