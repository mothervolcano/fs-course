import {
	TextField,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Button,
	SelectChangeEvent,
	Checkbox,
	ListItemText,
	Input,
	Rating,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
	Diagnosis,
	EntryFormValues,
	EntryType,
	HealthCheckRating,
} from "../../types";
import {
	Favorite,
	FavoriteBorder,
} from "@mui/icons-material";

interface Props {
	type: EntryType;
	onCancel: () => void;
	onSubmit: (values: EntryFormValues) => void;
	codes: Array<Diagnosis["code"]>;
}

const AddEntryForm = ({ type, onCancel, onSubmit, codes }: Props) => {
	const [date, setDate] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [specialist, setSpecialist] = useState<string>("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	const [healthCheckRating, setHealthCheckRating] = useState<
		HealthCheckRating | null
	>(null);
	const [discharge, setDischarge] = useState<{
		date: string;
		criteria: string;
	}>({ date: "", criteria: "" });
	const [employerName, setEmployerName] = useState<string>("");
	const [sickLeave, setSickLeave] = useState<{
		startDate: string;
		endDate: string;
	}>({ startDate: "", endDate: "" });


	// const getHealthCheckRatingValue = ( value: HealthCheckRating ): number {
	// 	return Object.values(HealthCheckRating).find( n => )
	// }

	const onHealthCheckRatingChange = (_event: SyntheticEvent<Element, Event>, value: number | null ) => {
		
		const rating = Object.values(HealthCheckRating).find(
			(v) => v === 4-Number(value),
		);
		if (rating !== undefined && rating !== null && typeof rating !== 'string') {
			setHealthCheckRating(rating);
		} else {
			setHealthCheckRating(0);
		}
	};

	const onDiagnosisCodeSelectionChange = (
		event: SelectChangeEvent<typeof diagnosisCodes>,
	) => {
		const values = event.target.value;

		setDiagnosisCodes(
			typeof values === "string" ? values.split(",") : values,
		);
	};

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();

		let newEntry = {
			date,
			description,
			specialist,
			// diagnosisCodes: diagnosisCodes.split(/\s*(?:,|$)\s*/),
			diagnosisCodes: diagnosisCodes,
		};

		switch (type) {
			case EntryType.HealthCheck:
				if (typeof healthCheckRating === "string" || healthCheckRating === null) {
					throw new Error("Healthcheck Rating Required");
				}
				onSubmit({ ...newEntry, type, healthCheckRating });
				break;
			case EntryType.Hospital:
				onSubmit({ ...newEntry, type, discharge });
				break;
			case EntryType.OccupationalHealthcare:
				onSubmit({ ...newEntry, type, employerName, sickLeave });
				break;
		}
	};

	return (
		<div style={{ border: "1px solid gray", padding: "15px" }}>
			<form onSubmit={addEntry}>
				<InputLabel>Date</InputLabel>
				<Input
					type="date"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<InputLabel sx={{ mt: 1 }}>Description</InputLabel>
				<Input
					type="text"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<InputLabel sx={{ mt: 1 }}>Specialist</InputLabel>
				<Input
					type="text"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				{type === EntryType.HealthCheck && (
					<>
						<InputLabel sx={{ mt: 1 }}>
							HealthCheck Rating
						</InputLabel>
						<Rating
							icon={<Favorite />}
							emptyIcon={<FavoriteBorder />}
							max={4}
							value={(healthCheckRating !== null ? 4-healthCheckRating : 0)}
							onChange={ onHealthCheckRatingChange }
						/>
					</>
					// <TextField
					// 	label="Healthcheck Rating"
					// 	fullWidth
					// 	value={healthCheckRating}
					// 	onChange={({ target }) =>
					// 		onHealthCheckRatingChange(target.value)
					// 	}
					// />
				)}
				{type === EntryType.Hospital && (
					<>
						<InputLabel style={{ marginTop: 20 }}>
							Discharge
						</InputLabel>
						<InputLabel>Date</InputLabel>
						<Input
							type="date"
							fullWidth
							value={discharge.date}
							onChange={({ target }) =>
								setDischarge({
									...discharge,
									date: target.value,
								})
							}
						/>
						<InputLabel>Criteria</InputLabel>
						<Input
							type="text"
							fullWidth
							value={discharge.criteria}
							onChange={({ target }) =>
								setDischarge({
									...discharge,
									criteria: target.value,
								})
							}
						/>
					</>
				)}
				{type === EntryType.OccupationalHealthcare && (
					<>
						<TextField
							label="Employer"
							fullWidth
							value={employerName}
							onChange={({ target }) =>
								setEmployerName(target.value)
							}
						/>
						<InputLabel style={{ marginTop: 20 }}>
							Sick Leave
						</InputLabel>
						<TextField
							label="Start Date"
							fullWidth
							value={sickLeave.startDate}
							onChange={({ target }) =>
								setSickLeave({
									...sickLeave,
									startDate: target.value,
								})
							}
						/>
						<TextField
							label="End Date"
							fullWidth
							value={sickLeave.endDate}
							onChange={({ target }) =>
								setSickLeave({
									...sickLeave,
									endDate: target.value,
								})
							}
						/>
					</>
				)}
				<InputLabel>Diagnosis Codes</InputLabel>
				<Select
					multiple
					fullWidth
					label="Diagnosis Codes"
					value={diagnosisCodes}
					onChange={onDiagnosisCodeSelectionChange}
					renderValue={(selected) => selected.join(",")}
				>
					{codes.map((code) => (
						<MenuItem key={code} value={code}>
							<Checkbox
								checked={diagnosisCodes.indexOf(code) > -1}
							/>
							<ListItemText primary={code} />
						</MenuItem>
					))}
				</Select>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					spacing={3}
					sx={{mt:3}}
				>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							type="button"
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddEntryForm;
