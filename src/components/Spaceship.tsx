import { useGLTF } from '@react-three/drei'
import type { JSX } from 'react'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		defaultMaterial: THREE.Mesh
	}
	materials: {
		lambert1: THREE.MeshStandardMaterial
	}
}

export function Spaceship(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF(
		'/assets/models/spaceship.glb'
	) as unknown as GLTFResult
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.defaultMaterial.geometry}
				material={materials.lambert1}
				userData={{ name: 'defaultMaterial' }}
			/>
		</group>
	)
}
