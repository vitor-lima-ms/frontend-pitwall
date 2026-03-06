/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindLaboratoryData from "@/responses/laboratories/find-lab-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getLaboratories */
const getLaboratories = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.LABORATORY,
  });

  const res = await ApiUtils.getData<FindLaboratoryData>(url!, token);

  return res;
};

export default getLaboratories;
