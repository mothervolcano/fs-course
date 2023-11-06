import { useState, useEffect } from "react";

import { Entry, Diagnosis } from "../../types";

import diagnosisService from "../../services/diagnoses";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";

interface Props {
	codes: Entry["diagnosisCodes"];
}

const DiagnosisList = ({ codes }: Props) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			if (codes) {
				const data = await diagnosisService.getAll();
				setDiagnoses(data.filter((n) => codes.includes(n.code)));
			}
		};

		fetchDiagnoses();
	}, []);

	return (
		<Grid container direction="column">
		<Divider sx={{ mt: 1.5, mb: 1}}/>
			{diagnoses.map((diagnosis) => {
				return (
				    <Grid
				    	key={diagnosis.code}
				    	container
				    	direction="row"
				    >
					<Typography variant="body2" sx={{ mr: 1, fontWeight: "bold"}}>{`${diagnosis.code}`}</Typography>
					<Typography variant="body2" >{diagnosis.name}</Typography>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default DiagnosisList;
