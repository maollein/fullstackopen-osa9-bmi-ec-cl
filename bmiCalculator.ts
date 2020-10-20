const bmiCalculator = (weight: number, height: number): string => {
  const bmi: number = (weight / Math.pow((height/100), 2));
  let msg = '';

  if (bmi < 15) {
      msg = 'Very severely underweight';
  } else if (bmi <= 16) {
    msg = 'Severely underweight';
  } else if (bmi <= 18.5) {
    msg = 'Underweight';
  } else if (bmi <= 25) {
    msg = 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    msg = 'Overweight';
  } else if (bmi <= 35) {
    msg = 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
    msg = 'Obese Class II (Severely obese)';
  } else {
    msg = 'Obese Class III (Very severely obese)';
  }
  return msg;
};

interface BmiArgs {
  weight: number,
  height: number
}

export const parseArgs = (args: Array<string>): BmiArgs => {
  if (args.length !== 4) throw new Error('Wrong number of arguments');
  const weight = Number(args[2]);
  const height = Number(args[3]);

  if (!isNaN(weight) && !isNaN(height)) {
    return {
      weight,
      height
    };
  } else throw new Error('Non-numeric arguments');
};

export default bmiCalculator;