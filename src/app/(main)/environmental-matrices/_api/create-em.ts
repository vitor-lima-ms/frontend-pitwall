/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* createEnvironmentalMatrix */
const createEnvironmentalMatrix = async (
  formData: FormData,
  token?: string,
) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.POST,
    url: ApiPathsEnum.ENVIRONMENTAL_MATRIX,
  });

  const res = await ApiUtils.postData(formData, url!, token);

  return res;
};

export default createEnvironmentalMatrix;
