import cors from 'cors';
import express from 'express';

import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();

app.use(cors())
app.use(express.json())

app.get('/api/ping', (_req, res) => {

	res.send('pong!')
})

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {

	console.log(`Server running on port ${PORT}`)
})