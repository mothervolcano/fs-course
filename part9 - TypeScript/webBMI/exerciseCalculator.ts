interface ExerciseReport {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number,
	average: number
}


const calculateExercises = ( dailyLog: number[] ): ExerciseReport => {

	const evaluations = [ 'what a slacker...', 'that\'s all you got?', 'not bad, we\'re impressed' ]
	const target = 2;
	const periodLength = dailyLog.length;
	const trainingDays = dailyLog.filter((n) => n > 0).length;
	const average = trainingDays > 0 ? dailyLog.reduce( (a, b) => a + b ) / periodLength : 0;
	const success = average > target ? true : false;
	const rating = success ? 3 : average > target/2 ? 2 : 1;
	const ratingDescription = evaluations[rating-1];

	return { 
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	}
}

const parseArguments = (args: string[]): number[] => {


	const values = args.slice(2)
	
	if (values.length < 2) throw new Error('You need to log at least 2 days')

	const log = values.map( (h) => {

		if (!isNaN(Number(h))) {

			if ( Number(h) < 24 ) {

				return Number(h)

			} else {

				throw new Error('On this planet the max number of hours per day is 24')
			}

		} else {

			throw new Error('All values must be numbers')
		}
	})

	console.log('parsed arguments: ', log)

	return log
}

try { 
	const log = parseArguments(process.argv);
	const report = calculateExercises(log);

	console.log(report)

} catch (error: unknown) {

	let errorMessage = 'Something has gone wrong';
	if ( error instanceof Error ) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage)

}