import {PlaneGeometry, ShaderMaterial, Mesh, Scene} from 'three';

export const getOverlayShader = (scene: Scene) => {
  const overlayGeometry = new PlaneGeometry(2, 2, 1, 1);
  const overlayShader = new ShaderMaterial({
    transparent: true,
    uniforms: {
      uAlpha: {value: 1},
    },
    vertexShader: `
         void main()
         {
             gl_Position = vec4(position, 1.0);
         }
     `,
    fragmentShader: `
         uniform float uAlpha;
 
         void main()
         {
             gl_FragColor = vec4(1, 1, 1, uAlpha);
         }
     `,
  });
  const overlay = new Mesh(overlayGeometry, overlayShader);
  scene.add(overlay);

  return overlayShader;
};
