import { DisplayDiaryEntry } from "../types";

interface EntryListProps {
	entries: DisplayDiaryEntry[];
}

interface EntryProps {
	date: string;
	weather: string;
	visibility: string;
}

const Entry = (props: EntryProps) => {

	const { date, weather, visibility } = props;

	return <div>
		<h2>{date}</h2>
		<h3>{weather}</h3>
		<h4>{visibility}</h4>
	</div>
}

const EntryList = (props: EntryListProps) => {
	const { entries } = props;

	return <div>
		
		{entries.map( (n) => (<Entry key={n.id} date={n.date} weather={n.weather} visibility={n.visibility} />) )}

	</div>;
};

export default EntryList;
