import { CoursePart } from "../types";

const entryStyle = {
	borderBottom: "1px solid black",
};

const descriptionStyle = {
	fontStyle: "italic"
};

interface PartProps {
	data: CoursePart;
}

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`,
	);
};

const Part = (props: PartProps) => {
	const { data } = props;

	let additionalContent = null;
	let description = null;

	switch (data.kind) {
		case "basic":
			description = (<p>{data.description}</p>);
			break;
		case "group":
			additionalContent = (<p>{`Group projects: ${data.groupProjectCount}`}</p>);
			break;
		case "background":
			description = (<p>{data.description}</p>);
			additionalContent = (<>
					<h4>Background Material</h4>
					<p>{data.backgroundMaterial}</p>
				</>)
			break;
		case "special":
			description = (<p>{data.description}</p>);
			additionalContent = (<h4>{`Required skills: ${data.requirements.join(', ')}`}</h4>)

			break;
		default:
			return assertNever(data);
	}

	return (
		<div style={entryStyle}>
			<h3>{data.name}</h3>
			<p>{`Exercises: ${data.exerciseCount}`}</p>
			<div style={descriptionStyle}>{description}</div>
			{additionalContent}
		</div>
	);
};

export default Part;
