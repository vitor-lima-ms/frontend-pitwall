/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getToxicParameters */
const getToxicParameters = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.TOXIC_PARAMETER,
  });

  const res = await ApiUtils.getData<FindToxicParameterData>(url!, token);

  return res;
};

export default getToxicParameters;
