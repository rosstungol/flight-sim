import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { Lighting } from './Lighting'
import { Skybox } from './Skybox'
import { Spaceship } from './Spaceship'

export function SpaceScene() {
	return (
		<Canvas dpr={[1, 1.5]} className='canvas'>
			<Spaceship />
			<PerspectiveCamera makeDefault position={[0, 0.5, 4]} />
			<OrbitControls />
			<Lighting />
			<Skybox />
		</Canvas>
	)
}
