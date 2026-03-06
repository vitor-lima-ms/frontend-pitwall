/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* updateSotp */
const updateSotp = async (formData: FormData, id?: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.PUT,
    url: ApiPathsEnum.SCOCOH_OF_TOXIC_PARAMETER,
  });

  const res = await ApiUtils.putData<string>(formData, url!, token);

  return res;
};

export default updateSotp;
