/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import EPAEvaluation from "@/responses/app-utils/epa-evaluation.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* EPAHorizontalImport_ */
const EPAHorizontalImport_ = async (formData: FormData, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.POST,
    url: `${ApiPathsEnum.APP_UTILS}/import-epa-horizontal`,
  });

  const res = await ApiUtils.postData<EPAEvaluation>(formData, url!, token);

  return res;
};

export default EPAHorizontalImport_;
