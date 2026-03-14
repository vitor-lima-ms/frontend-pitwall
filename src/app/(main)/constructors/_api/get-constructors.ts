/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindConstructorsData from "@/responses/constructors/find-constructors-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getConstructors */
const getConstructors = async (year: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    params: [year],
    url: ApiPathsEnum.CONSTRUCTOR,
  });

  const res = await ApiUtils.getData<FindConstructorsData>(url!);

  return res;
};

export default getConstructors;
