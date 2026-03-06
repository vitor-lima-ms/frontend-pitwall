/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindImportData from "@/responses/imports/find-imp-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getImports */
const getImports = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.IMPORT,
  });

  const res = await ApiUtils.getData<FindImportData>(url!, token);

  return res;
};

export default getImports;
