import { CoursePart } from "../types";

interface TotalProps {
	parts: CoursePart[];
}

const Total = (props: TotalProps) => {
	const { parts } = props;

	const totalExercises = parts.reduce(
		(sum, part) => sum + part.exerciseCount,
		0,
	);

	return (
		<div>
			<h3>{`TOTAL EXERCISES: ${totalExercises}`}</h3>
		</div>
	);
};

export default Total;
