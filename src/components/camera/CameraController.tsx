import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame } from '@react-three/fiber'
import type { RefObject } from 'react'
import { type Group, Matrix4, Vector3 } from 'three'

export const shipPosition = new Vector3(0, 0, 0)
export const cameraMatrixPosition = new Vector3(0, 0.3, 2.5)

export function CameraController({
	meshRef,
}: {
	meshRef: RefObject<Group | null>
}) {
	useFrame(({ camera }) => {
		shipPosition.add(new Vector3(0, 0, -1))

		const matrix = new Matrix4().multiply(
			new Matrix4().makeTranslation(
				shipPosition.x,
				shipPosition.y,
				shipPosition.z
			)
		)

		if (meshRef.current == null) return

		meshRef.current.matrixAutoUpdate = false
		meshRef.current.matrix.copy(matrix)
		meshRef.current.matrixWorldNeedsUpdate = true

		const cameraMatrix = new Matrix4()
			.multiply(
				new Matrix4().makeTranslation(
					shipPosition.x,
					shipPosition.y,
					shipPosition.z
				)
			)
			.multiply(new Matrix4().makeRotationX(-0.2))
			.multiply(
				new Matrix4().makeTranslation(
					cameraMatrixPosition.x,
					cameraMatrixPosition.y,
					cameraMatrixPosition.z
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
				cameraMatrixPosition.x,
				cameraMatrixPosition.y,
				cameraMatrixPosition.z,
			]}
		/>
	)
}
