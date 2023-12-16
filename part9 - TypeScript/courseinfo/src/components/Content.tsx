import { CoursePart } from "../types";

import Part from "./Part";

interface ContentProps {
	parts: CoursePart[];
}

const Content = (props: ContentProps) => {
	const { parts } = props;

	return (
		<div>
			{parts.map((part) => (
				<div key={part.name}>
					<Part data={part}/>
				</div>
			))}
		</div>
	);
};

export default Content;
