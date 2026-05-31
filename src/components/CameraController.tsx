import { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera'
import { useFrame } from '@react-three/fiber'
import { type RefObject, useEffect } from 'react'
import {
	type Group,
	Matrix4,
	type PerspectiveCamera as PerspectiveCameraType,
	Quaternion,
	Vector3,
} from 'three'

import { attachControls } from '../config/attachControls'
import { updateSpaceshipAxis } from '../config/updateSpaceshipAxis'

const x = new Vector3(1, 0, 0)
const y = new Vector3(0, 1, 0)
const z = new Vector3(0, 0, 1)

export const spaceshipPosition = new Vector3(0, 0, 0)
export const cameraMatrixPosition = new Vector3(0, 0.3, 2.5)

const delayedRotationMatrix = new Matrix4()
const delayedQuaternion = new Quaternion()

export function CameraController({
	meshRef,
}: {
	meshRef: RefObject<Group | null>
}) {
	useEffect(() => attachControls(), [])

	useFrame(({ camera }, delta) => {
		updateSpaceshipAxis(
			x,
			y,
			z,
			spaceshipPosition,
			camera as PerspectiveCameraType,
			delta
		)

		const rotationMatrix = new Matrix4().makeBasis(x, y, z)

		const matrix = new Matrix4()
			.multiply(
				new Matrix4().makeTranslation(
					spaceshipPosition.x,
					spaceshipPosition.y,
					spaceshipPosition.z
				)
			)
			.multiply(rotationMatrix)

		if (meshRef.current != null) {
			meshRef.current.matrixAutoUpdate = false
			meshRef.current.matrix.copy(matrix)
			meshRef.current.matrixWorldNeedsUpdate = true
		}

		const quaternionA = new Quaternion().copy(delayedQuaternion)
		const quaternionB = new Quaternion()

		quaternionB.setFromRotationMatrix(rotationMatrix)

		const interpolationFactor = 0.175
		const interpolatedQuaternion = new Quaternion().copy(quaternionA)

		interpolatedQuaternion.slerp(quaternionB, interpolationFactor)
		delayedQuaternion.copy(interpolatedQuaternion)

		delayedRotationMatrix.identity()
		delayedRotationMatrix.makeRotationFromQuaternion(delayedQuaternion)

		const cameraMatrix = new Matrix4()
			.multiply(
				new Matrix4().makeTranslation(
					spaceshipPosition.x,
					spaceshipPosition.y,
					spaceshipPosition.z
				)
			)
			.multiply(delayedRotationMatrix)
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
