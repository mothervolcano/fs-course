

const calculateBmi = ( height: number, weight: number ): string => {

	const heightMeters = height/100
	const bmi = weight / (heightMeters*heightMeters);

	if ( bmi < 16 ) {
		return 'severely underweight';
	} else if ( bmi > 16 && bmi < 18.5) {
		return 'underweight';
	} else if ( bmi > 18.5 && bmi < 25 ) {
		return 'normal';
	} else if ( bmi > 25 && bmi < 30 ) {
		return 'pre-obese';
	} else if ( bmi > 30 ) {
		return 'obese'
	} else {
		return 'bmi could not be determined'
	}
}

export default calculateBmi