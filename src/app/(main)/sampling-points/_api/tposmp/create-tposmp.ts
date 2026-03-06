/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* createTposmp */
const createTposmp = async (formData: FormData, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.POST,
    url: ApiPathsEnum.TOXIC_PARAMETER_OF_SAMPLE,
  });

  const res = await ApiUtils.postData(formData, url!, token);

  return res;
};

export default createTposmp;
