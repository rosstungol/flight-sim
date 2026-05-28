export let controls = {}

window.addEventListener('keydown', (e) => {
	controls[e.key.toLowerCase()] = true
})

window.addEventListener('keyup', (e) => {
	controls[e.key.toLowerCase()] = false
})

let yawVelocity = 0
let pitchVelocity = 0
const spaceshipSpeed = 1

export function updateSpaceshipAxis(x, y, z, spaceshipPosition, camera) {
	yawVelocity = 0
	pitchVelocity = 0

	if (controls['a']) {
		yawVelocity = 0.025
	}

	if (controls['d']) {
		yawVelocity = -0.025
	}

	if (controls['s']) {
		pitchVelocity = 0.025
	}

	if (controls['w']) {
		pitchVelocity = -0.025
	}

	x.applyAxisAngle(z, yawVelocity)
	y.applyAxisAngle(z, yawVelocity)

	y.applyAxisAngle(x, pitchVelocity)
	z.applyAxisAngle(x, pitchVelocity)

	x.normalize()
	y.normalize()
	z.normalize()

	spaceshipPosition.add(z.clone().multiplyScalar(-spaceshipSpeed))
}
