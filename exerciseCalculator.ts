export interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: 'Poor' | 'Good' | 'Excellent'
}

export interface ExerciseInfo {
  trainingHours: Array<number>,
  target: number
}

export const parseArguments = (args: Array<string>): ExerciseInfo => {
  const parsedArgs = [];
  for (let i = 3; i < args.length; i++) {
    const parsed = Number(args[i]);
    if (isNaN(parsed)) throw new Error('Non-numeric argument');
    parsedArgs.push(parsed);
  }
  
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Non-numeric argument');
  
  return {
    trainingHours: parsedArgs,
    target
  };
};

export const parseInternetArguments = (args: Array<string>): ExerciseInfo => {
  const parsedArgs = [];
  for (let i = 1; i < args.length; i++) {
    const parsed = Number(args[i]);
    if (isNaN(parsed)) throw new Error('Non-numeric argument');
    parsedArgs.push(parsed);
  }
  
  const target = Number(args[0]);
  if (isNaN(target)) throw new Error('Non-numeric argument');
  
  return {
    trainingHours: parsedArgs,
    target
  };
};

const exerciseCalculator = (info: ExerciseInfo): ExerciseResults => {
  const average = info.trainingHours.reduce((acc, hours) => acc + hours, 0) / info.trainingHours.length;
  let rating: 1 | 2 | 3;
  let ratingDescription: 'Poor' | 'Good' | 'Excellent';

  if (info.target - average <= 0) {
    rating = 3;
    ratingDescription = 'Excellent';
  } else if (info.target - average <= 1) {
    rating = 2;
    ratingDescription = 'Good';
  } else {
    rating = 1,
    ratingDescription = 'Poor';
  }

  const results: ExerciseResults = {
    periodLength: info.trainingHours.length,
    trainingDays: info.trainingHours.reduce((acc, hours) => hours > 0 ? acc + 1 : acc, 0),
    target: info.target,
    average: average,
    success: average >= info.target,
    rating,
    ratingDescription
  };

  return results;
};

export default exerciseCalculator;