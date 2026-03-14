/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindCircuitsData from "@/responses/circuits/find-circuits-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getCircuits */
const getCircuits = async () => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.CIRCUIT,
  });

  const res = await ApiUtils.getData<FindCircuitsData>(url!);

  return res;
};

export default getCircuits;
