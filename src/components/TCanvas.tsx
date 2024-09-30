import React, { Suspense, VFC, useMemo } from 'react';
import { OrbitControls, Stats, Plane } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Effect } from './Effect';
import { ImagePlane } from './ImagePlane';
import * as THREE from 'three';

export const TCanvas: VFC = () => {

	const VideoBackground = () => {
		const { viewport, camera } = useThree()
		
		const video = useMemo(() => {
		  const vid = document.createElement('video')
		  vid.src = "/mv_a_pc.mp4" // path to your video file
		  vid.loop = true
		  vid.muted = true
		  vid.play()
		  return vid
		}, [])
	  
		const videoTexture = new THREE.VideoTexture(video)
		
		return (
		  <Plane args={[viewport.width, viewport.height, 1]} position={[0, 0, 4]} >
			<meshBasicMaterial attach="material" map={videoTexture} depthTest={false} />
		  </Plane>
		)
	  }

	return (
		<Canvas
			camera={{
				position: [0, 0, 2],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}>
			{/* canvas color */}
			{/* <color attach="background" args={['#000']} /> */}
			{/* camera controller */}
			{/* helper */}
			{/* object */}
			<Suspense fallback={null}>
				<ImagePlane />
			</Suspense>
			{/* effect */}
			<Effect />
		</Canvas>
	)
}
