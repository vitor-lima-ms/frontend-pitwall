/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* deleteQsfgp */
const deleteQsfgp = async (id: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.DELETE,
    url: ApiPathsEnum.QUALITY_STANDARD_FOR_GENERIC_PARAMETERS,
  });

  const res = await ApiUtils.deleteData(url!, token);

  return res;
};

export default deleteQsfgp;
