/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getRegulations */
const getRegulations = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.REGULATION,
  });

  const res = await ApiUtils.getData<FindRegulationData>(url!, token);

  return res;
};

export default getRegulations;
