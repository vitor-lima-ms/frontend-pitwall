/* Response imports */
import FindSamplingPointData from "../sampling-points/find-sp-data.response";
/* ClassificationDetails */
export default interface ClassificationDetails {
  smpClassificationDetails: FindSamplingPointData["spSamples"][0]["smpClassificationDetails"];
}
