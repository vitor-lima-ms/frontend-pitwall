/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* updateTposmp */
const updateTposmp = async (
  formData: FormData,
  id?: string,
  token?: string,
) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.PUT,
    url: ApiPathsEnum.TOXIC_PARAMETER_OF_SAMPLE,
  });

  const res = await ApiUtils.putData<string>(formData, url!, token);

  return res;
};

export default updateTposmp;
