/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindEmData from "@/responses/environmental-matrices/find-em-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getEnvironmentalMatrices */
const getEnvironmentalMatrices = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.ENVIRONMENTAL_MATRIX,
  });

  const res = await ApiUtils.getData<FindEmData>(url!, token);

  return res;
};

export default getEnvironmentalMatrices;
