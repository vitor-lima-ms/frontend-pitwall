/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* deleteToxicParameter */
const deleteToxicParameter = async (id: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.DELETE,
    url: ApiPathsEnum.TOXIC_PARAMETER,
  });

  const res = await ApiUtils.deleteData(url!, token);

  return res;
};

export default deleteToxicParameter;
