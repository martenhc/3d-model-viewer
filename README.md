# << WIP >>

**3D model viewer made with Lit.**

https://user-images.githubusercontent.com/8031165/197491029-ea6a880d-1b41-4088-b248-bd84c4b0994a.mp4

### Features

The module will be able to receive a .glb model and an optional list of hotspots and information which will be rendered on top of the model.

A tool to calculate the hotspots coordinates will be built after the module is ready.

### How to use

1. Import the component

```html

<script type="module" src="https://unpkg.com/3d-model-viewer@0.1.0/build/3d-model-viewer.es.js"></script>
```

2. Use the module sending a model URL and an optional list of hotspots

```html 
    <model-viewer 
        modelUrl="https://your-domain.com/your/model/path/your-model.glb" 
        hotspots='[{"position": [0.2, 0.3, 0.15],"text": "This is one hotspot"},{"position": [0.1, 0.7, -0.2],"text": "This is a second hotspot"},{"position": [-0.1, -0.35, 0.1],"text": "This is the last hotspot"}]'>
    </model-viewer>
```

### Tech stack

- [Lit](https://lit.dev)
- [ThreeJS](https://threejs.org/)
- [Tween.js](https://www.npmjs.com/package/@tweenjs/tween.js)

### Scripts

- `dev`: Run dev server on port 3000.
- `build`: Build bundle.
- `serve`: Serve build on port 8080.
