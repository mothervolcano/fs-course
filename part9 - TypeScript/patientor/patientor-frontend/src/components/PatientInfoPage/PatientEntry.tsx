import { Favorite, FavoriteBorder, LocalHospitalRounded, MedicalInformation, MonitorHeartRounded } from "@mui/icons-material";
import { Entry, HealthcareEntry as HealthcareEntryType, OccupationalHealthcareEntry as OccupationalHealthcareEntryType, HospitalEntry as HospitalEntryType } from "../../types";

import DiagnosisList from "./DiagnosisList";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";

interface Props {

	entry: Entry;
}

const assertNever = (value: never): never => {
	throw new Error(`unhandled descriminated member ${JSON.stringify(value)}`)
}

const HealthcareEntry = ({ entry }: { entry: HealthcareEntryType}) => {

	return <div>
		<MonitorHeartRounded/>
		<Typography variant="subtitle2">{entry.date}</Typography>
		<Typography sx={{ mb: 1.5 }}>{entry.description}</Typography>
		<Rating
			value={4-entry.healthCheckRating}
			max={4}
			precision={1}
			icon={<Favorite />}
			emptyIcon={<FavoriteBorder />}
		/>
	</div>
}

const HospitalEntry = ({ entry }: { entry: HospitalEntryType}) => {

	return <div>
		<LocalHospitalRounded />
		<Typography variant="subtitle2">{entry.date}</Typography>
		<Typography sx={{ mb: 1.5 }}>{entry.description}</Typography>
		<Typography variant="body1">{`Discharged on: ${entry.discharge.date}. Criteria: ${entry.discharge.criteria}`}</Typography>
	</div>
}

const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntryType}) => {

	return <div>		
		<MedicalInformation />
		<Typography variant="subtitle2">{entry.date}</Typography>
		<Typography sx={{ mb: 1.5 }}>{entry.description}</Typography>
		{entry.sickLeave && <Typography>{`Sick Leave: ${entry.sickLeave?.startDate} to ${entry.sickLeave?.endDate}`}</Typography>}
	</div>
}

const EntryTypeSelector = ({ entry }: Props) => {

	switch (entry.type) {
		case "Hospital":
			return <HospitalEntry entry={entry} />
		case "OccupationalHealthcare":
			return <OccupationalHealthcareEntry entry={entry} />
		case "HealthCheck":
			return <HealthcareEntry entry={entry} />
		default:
			assertNever(entry);
	}
}

const PatientEntry = ({ entry }: Props) => {

	return <div>
		<EntryTypeSelector entry={entry} />
		{entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes} />}
	</div>
}

export default PatientEntry;