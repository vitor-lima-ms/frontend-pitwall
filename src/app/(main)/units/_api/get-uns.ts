/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindUnitData from "@/responses/units/find-un-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getUnits */
const getUnits = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.UNIT,
  });

  const res = await ApiUtils.getData<FindUnitData>(url!, token);

  return res;
};

export default getUnits;
