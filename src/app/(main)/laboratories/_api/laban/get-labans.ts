/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getLabans */
const getLabans = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.LABORATORY_ANALYSIS,
  });

  const res = await ApiUtils.getData<FindLabanData>(url!, token);

  return res;
};

export default getLabans;
