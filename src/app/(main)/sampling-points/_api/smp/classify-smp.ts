/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* classifySample */
const classifySample = async (
  formData: FormData,
  id?: string,
  token?: string,
) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.PUT,
    url: ApiPathsEnum.SAMPLE,
  });

  const res = await ApiUtils.patchData(formData, url!, token);

  return res;
};

export default classifySample;
