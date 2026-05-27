export function Lighting() {
	return (
		<>
			<directionalLight
				color={'#81AFEA'}
				intensity={10}
				position={[0, -15, 0]}
			/>
			<directionalLight
				color={'#F1F9F0'}
				intensity={20}
				position={[-250, -180, -250]}
			/>
			<directionalLight
				color={'#D5B9D5'}
				intensity={10}
				position={[-500, 15, 285]}
			/>
		</>
	)
}
