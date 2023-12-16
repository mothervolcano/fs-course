import { useState } from "react";

import { NewDiaryEntry } from "../types";

interface DiaryEntryFormProps {
	onAddEntry: (newEntry: NewDiaryEntry) => void;
}

const getFormInput = (inputs: FormData, name: string): string => {
	const value = inputs.get(name);
	if ( typeof value === 'string' ) {
		return value
	}

	throw new Error(`Invalid input type for ${name}`)
}

const AddEntryForm = ( props: DiaryEntryFormProps ) => {

	const { onAddEntry } = props;
	
	const [date, setDate] = useState("");
	// const [visibility, setVisibility] = useState("");
	// const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted ", e.currentTarget);

		const inputs = new FormData(e.currentTarget);

		const newEntry = {
			date: getFormInput(inputs, "date"),
			weather: getFormInput(inputs, "weather"),
			visibility: getFormInput(inputs, "visibility"),
			comment: getFormInput(inputs, "comment"),
		}

		onAddEntry(newEntry);
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div>
					<label>Date</label>
					<input
						type="date"
						name="date"
						value={date}
						onChange={({ target }) => setDate(target.value)}
					/>
				</div>
				<div>
					<h4>Visibility</h4>
					<label>great</label>
					<input type="radio" name="visibility" id="greatOption" value="great"/>
					<label>good</label>
					<input type="radio" name="visibility" id="goodOption" value="good"/>
					<label>ok</label>
					<input type="radio" name="visibility" id="okOption" value="ok"/>
					<label>poor</label>
					<input type="radio" name="visibility" id="poorOption" value="poor"/>
				</div>
				<div>
					<h4>Weather</h4>
					<label>sunny</label>
					<input type="radio" name="weather" id="sunnyOption" value="sunny"/>
					<label>rainy</label>
					<input type="radio" name="weather" id="rainyOption" value="rainy"/>
					<label>cloudy</label>
					<input type="radio" name="weather" id="cloudyOption" value="cloudy"/>
					<label>stormy</label>
					<input type="radio" name="weather" id="stormyOption" value="stormy"/>
					<label>windy</label>
					<input type="radio" name="weather" id="windyOption" value="windy"/>
				</div>
				<div>
					<h4>Comment</h4>
					<input
						name="comment"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
				</div>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default AddEntryForm;
