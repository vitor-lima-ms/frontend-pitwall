/* EPAEvaluation */
export default interface EPAEvaluation {
  smpAnyParamaterBeyondLimit: boolean;
  smpDescription: string;
  smpResults: {
    parameterBeyondLimit: boolean;
    parameterId: string;
    parameterLimit: number;
    parameterName: string;
    parameterResult: number;
  }[];
  smpSamplingDate: string | null;
}
