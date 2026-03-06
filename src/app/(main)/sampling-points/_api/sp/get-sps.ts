/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getSamplingPoints */
const getSamplingPoints = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.SAMPLING_POINT,
  });

  const res = await ApiUtils.getData<FindSamplingPointData>(url!, token);

  return res;
};

export default getSamplingPoints;
