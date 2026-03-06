/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* deleteGposmp */
const deleteGposmp = async (id: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.DELETE,
    url: ApiPathsEnum.GENERIC_PARAMETER_OF_SAMPLE,
  });

  const res = await ApiUtils.deleteData(url!, token);

  return res;
};

export default deleteGposmp;
