/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* updateQsfgp */
const updateQsfgp = async (formData: FormData, id?: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.PUT,
    url: ApiPathsEnum.QUALITY_STANDARD_FOR_GENERIC_PARAMETERS,
  });

  const res = await ApiUtils.putData<string>(formData, url!, token);

  return res;
};

export default updateQsfgp;
