/* GenerateAnalysisRequest */
export default interface GenerateAnalysisRequest {
  analysesRequests: {
    labanName: string;
    smpsNames: string[];
    gpsNames?: string[];
    tpsNames?: string[];
    obs?: string;
  }[];
}
