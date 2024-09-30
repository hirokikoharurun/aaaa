import React, { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { publicPath } from '../utils/file';

export const ImagePlane: VFC = () => {
    const { gl, viewport } = useThree();
    const path = (name: string) => publicPath(`/assets/images/${name}.mp4`);
    const videoRef : any = useRef<HTMLVideoElement>(null);

    const videoTextures = ['mv_a_pc'].map(name => {
        const video = document.createElement('video');
        video.src = path(name);
        video.loop = true;
        video.load();
        video.play();
        videoRef.current = video;
        return new THREE.VideoTexture(video);
    });

    const material = (texture: THREE.Texture) =>
        new THREE.ShaderMaterial({
            uniforms: {
                u_texture: { value: texture }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);

    return (
        <>
            {videoTextures.map((texture, i) => (
                <Plane key={i} args={[viewport.width, viewport.height, 1]} material={material(texture)} scale={0.98} position={[0, 0, 0]} />
            ))}
        </>
    );
}

const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  gl_FragColor = color;
}
`;
