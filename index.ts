import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator, { parseInternetArguments } from './exerciseCalculator';

interface ExerciseCalcArgs {
  daily_exercises: Array<string>,
  target: string
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!isNaN(weight) && !isNaN(height)) {
    const bmi = bmiCalculator(weight, height);
    return res.json({ weight, height, bmi });
  } else return res.status(401).json({ error: 'Malformatted parameters' });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseCalcArgs;
  if (!daily_exercises || !target)
    return res.status(400).json({ error: 'parameters missing' });
  try {
    const info = parseInternetArguments([target, ...daily_exercises]);
    const response = exerciseCalculator(info);
    return res.json(response);
  } catch {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});