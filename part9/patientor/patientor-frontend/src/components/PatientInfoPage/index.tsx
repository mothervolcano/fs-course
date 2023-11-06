import axios from "axios";
import { useEffect, useState } from "react";

import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Stack,
	Typography,
} from "@mui/material";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import {
	Diagnosis,
	Entry,
	EntryFormValues,
	EntryType,
	Patient,
} from "../../types";
import PatientEntry from "./PatientEntry";
import AddEntryForm from "./AddEntryForm";

interface Props {
	patient: Patient | null;
}

const PatientInfoPage = ({ patient }: Props) => {
	const [error, setError] = useState<string>();
	const [entryType, setEntryType] = useState<EntryType>();
	const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
	const [patientData, setPatientData] = useState<Patient | null>(null);
	const [patientEntries, setPatientEntries] = useState<Entry[]>([]);
	const [diagnosisCodes, setDiagnosisCodes] = useState<
		Array<Diagnosis["code"]>
	>([]);

	useEffect(() => {
		const fetchPatientData = async () => {
			if (patient) {
				const data = await patientService.getById(patient.id);
				const codes = await diagnosisService.getCodes();
				setPatientData(data);
				setPatientEntries(data.entries);
				setDiagnosisCodes(codes);
			}
		};

		fetchPatientData();
	}, []);

	if (!patient || !patientData) {
		return <div>{`Patient not found...`}</div>;
	}

	const setNewEntry = (type: EntryType) => {
		setEntryType(type);
		setShowEntryForm(true);
	};

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const entry = await patientService.createEntry(patient.id, values);
			setPatientEntries(patientEntries.concat(entry));
			setShowEntryForm(false);
			setError(undefined);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (
					e?.response?.data &&
					typeof e?.response?.data === "string"
				) {
					const message = e.response.data.replace(
						"Something went wrong. Error: ",
						"",
					);
					console.log("ERROR: ", e);
					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};

	const handleCancel = () => {
		setShowEntryForm(false);
		setError(undefined);
	};

	console.log("patient info: ", patient);

	return (
		<div>
			<Typography variant="h4" sx={{ mt: 2}}>{patient.name}</Typography>
			{patientData && <Typography variant="subtitle2">{patientData.ssn}</Typography>}
			<Typography>{patient.occupation}</Typography>
			<Divider sx={{ mt: 2, mb: 2 }}/>
			{!showEntryForm && (
				<Box sx={{ "& button": { m: 1 } }}>
					<Button
						size="small"
						variant="outlined"
						onClick={() => setNewEntry(EntryType.HealthCheck)}
					>
						New Health Check Entry
					</Button>
					<Button
						size="small"
						variant="outlined"
						onClick={() => setNewEntry(EntryType.Hospital)}
					>
						New Hospital Entry
					</Button>
					<Button
						size="small"
						variant="outlined"
						onClick={() =>
							setNewEntry(EntryType.OccupationalHealthcare)
						}
					>
						New Occupational Healthcare Entry
					</Button>
				</Box>
			)}
			{error && <Alert severity="error">{error}</Alert>}
			{showEntryForm && (
				<AddEntryForm
					type={entryType}
					codes={diagnosisCodes}
					onSubmit={submitNewEntry}
					onCancel={handleCancel}
				/>
			)}

			{patientEntries.length > 0 && (
				<Box sx={{}}>
					<Typography variant="h5" sx={{ mt: 2, mb: 1.5 }}>Entries</Typography>
					<Stack spacing={2}>
						{patientEntries.map((n) => {
							return (
								<Card key={n.date}>
									<CardContent>
										<PatientEntry entry={n} />
									</CardContent>
								</Card>
							);
						})}
					</Stack>
				</Box>
			)}
		</div>
	);
};

export default PatientInfoPage;
