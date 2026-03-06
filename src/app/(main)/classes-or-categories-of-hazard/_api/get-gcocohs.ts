/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindGcocohData from "@/responses/generic-classes-or-categories-of-hazard/find-gcocoh-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getGcocohs */
const getGcocohs = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.GENERIC_CLASS_OR_CATEGORY_OF_HAZARD,
  });

  const res = await ApiUtils.getData<FindGcocohData>(url!, token);

  return res;
};

export default getGcocohs;
