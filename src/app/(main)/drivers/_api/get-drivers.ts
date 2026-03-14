/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindDriversData from "@/responses/drivers/find-drivers-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getDrivers */
const getDrivers = async (year: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    params: [year],
    url: ApiPathsEnum.DRIVER,
  });

  const res = await ApiUtils.getData<FindDriversData>(url!);

  return res;
};

export default getDrivers;
