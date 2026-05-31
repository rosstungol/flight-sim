import { type ControlKey, controls } from './controls'

function isControlKey(key: string): key is ControlKey {
	return key in controls
}

export function attachControls() {
	if (typeof window === 'undefined') {
		return () => {}
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		const key = e.key.toLowerCase()
		if (isControlKey(key)) {
			controls[key] = true
		}
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key.toLowerCase()
		if (isControlKey(key)) {
			controls[key] = false
		}
	}

	window.addEventListener('keydown', handleKeyDown)
	window.addEventListener('keyup', handleKeyUp)

	return () => {
		window.removeEventListener('keydown', handleKeyDown)
		window.removeEventListener('keyup', handleKeyUp)
	}
}
