/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* deleteEnvironmentalMatrix */
const deleteEnvironmentalMatrix = async (id: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.DELETE,
    url: ApiPathsEnum.ENVIRONMENTAL_MATRIX,
  });

  const res = await ApiUtils.deleteData(url!, token);

  return res;
};

export default deleteEnvironmentalMatrix;
