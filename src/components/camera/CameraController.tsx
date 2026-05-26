import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import { type Group, Matrix4, Vector3 } from 'three'

import { CAMERA_MATRIX_POSITION, SHIP_POSITION } from '../sceneConfig'

export function CameraController({
	meshRef,
}: {
	meshRef: RefObject<Group | null>
}) {
	useFrame(({ camera }) => {
		SHIP_POSITION.add(new Vector3(0, 0, -1))

		const matrix = new Matrix4().multiply(
			new Matrix4().makeTranslation(
				SHIP_POSITION.x,
				SHIP_POSITION.y,
				SHIP_POSITION.z
			)
		)

		if (meshRef.current == null) return

		meshRef.current.matrixAutoUpdate = false
		meshRef.current.matrix.copy(matrix)
		meshRef.current.matrixWorldNeedsUpdate = true

		const cameraMatrix = new Matrix4()
			.multiply(
				new Matrix4().makeTranslation(
					SHIP_POSITION.x,
					SHIP_POSITION.y,
					SHIP_POSITION.z
				)
			)
			.multiply(new Matrix4().makeRotationX(-0.2))
			.multiply(
				new Matrix4().makeTranslation(
					CAMERA_MATRIX_POSITION.x,
					CAMERA_MATRIX_POSITION.y,
					CAMERA_MATRIX_POSITION.z
				)
			)

		camera.matrixAutoUpdate = false
		camera.matrix.copy(cameraMatrix)
		camera.matrixWorldNeedsUpdate = true
	})

	return (
		<PerspectiveCamera
			makeDefault
			position={[
				CAMERA_MATRIX_POSITION.x,
				CAMERA_MATRIX_POSITION.y,
				CAMERA_MATRIX_POSITION.z,
			]}
		/>
	)
}
