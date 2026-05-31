import type { PerspectiveCamera, Vector3 } from 'three'

type ControlKey = 'a' | 'd' | 'w' | 's' | 'r' | 'shift'

type Controls = Record<ControlKey, boolean>

export const controls: Controls = {
	a: false,
	d: false,
	w: false,
	s: false,
	r: false,
	shift: false,
}

function isControlKey(key: string): key is ControlKey {
	return key in controls
}

window.addEventListener('keydown', (e) => {
	const key = e.key.toLowerCase()

	if (isControlKey(key)) {
		controls[key] = true
	}
})

window.addEventListener('keyup', (e) => {
	const key = e.key.toLowerCase()

	if (isControlKey(key)) {
		controls[key] = false
	}
})

let yawVelocity = 0
let pitchVelocity = 0
const maxVelocity = 0.04
const spaceshipSpeed = 0.2
export let turbo = 0

function easeOutQuad(x: number) {
	return 1 - (1 - x) * (1 - x)
}

export function updateSpaceshipAxis(
	x: Vector3,
	y: Vector3,
	z: Vector3,
	spaceshipPosition: Vector3,
	camera: PerspectiveCamera
) {
	yawVelocity *= 0.95
	pitchVelocity *= 0.95

	if (controls.a) {
		yawVelocity += 0.0025
	}

	if (controls.d) {
		yawVelocity -= 0.0025
	}

	if (controls.w) {
		pitchVelocity += 0.0025
	}

	if (controls.s) {
		pitchVelocity -= 0.0025
	}

	if (Math.abs(yawVelocity) > maxVelocity)
		yawVelocity = Math.sign(yawVelocity) * maxVelocity

	if (Math.abs(pitchVelocity) > maxVelocity)
		pitchVelocity = Math.sign(pitchVelocity) * maxVelocity

	if (controls.r) {
		yawVelocity = 0
		pitchVelocity = 0
		turbo = 0
		x.set(1, 0, 0)
		y.set(0, 1, 0)
		z.set(0, 0, 1)
		spaceshipPosition.set(0, 0, 0)
	}

	x.applyAxisAngle(z, yawVelocity)
	y.applyAxisAngle(z, yawVelocity)

	y.applyAxisAngle(x, pitchVelocity)
	z.applyAxisAngle(x, pitchVelocity)

	x.normalize()
	y.normalize()
	z.normalize()

	if (controls.shift) {
		turbo += 0.025
	} else {
		turbo *= 0.95
	}

	turbo = Math.min(Math.max(turbo, 0), 1)

	const turboSpeed = easeOutQuad(turbo) * 0.025

	camera.fov = 45 + turboSpeed * 900
	camera.updateProjectionMatrix()

	spaceshipPosition.add(z.clone().multiplyScalar(-spaceshipSpeed - turboSpeed))
}
