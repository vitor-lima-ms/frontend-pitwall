/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getGenericParameters */
const getGenericParameters = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.GENERIC_PARAMETER,
  });

  const res = await ApiUtils.getData<FindGenericParameterData>(url!, token);

  return res;
};

export default getGenericParameters;
