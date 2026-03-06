/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* updateLaban */
const updateLaban = async (
  formData: FormData,
  id?: string,
  token?: string,
) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.PUT,
    url: ApiPathsEnum.LABORATORY_ANALYSIS,
  });

  const res = await ApiUtils.putData<string>(formData, url!, token);

  return res;
};

export default updateLaban;
