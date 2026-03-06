/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindLChapterData from "@/responses/lgr-chapters/find-lchap-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getSamplingPoints */
const getLChaps = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.LGR_CHAPTER,
  });

  const res = await ApiUtils.getData<FindLChapterData>(url!, token);

  return res;
};

export default getLChaps;
