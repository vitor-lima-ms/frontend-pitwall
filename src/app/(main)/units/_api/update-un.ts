/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* updateUnit */
const updateUnit = async (formData: FormData, id?: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.PUT,
    url: ApiPathsEnum.UNIT,
  });

  const res = await ApiUtils.putData<string>(formData, url!, token);

  return res;
};

export default updateUnit;
