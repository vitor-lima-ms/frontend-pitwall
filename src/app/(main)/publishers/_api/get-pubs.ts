/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Response imports */
import FindPublisherData from "@/responses/publishers/find-pub-data.response";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getPublishers */
const getPublishers = async (token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.GET,
    url: ApiPathsEnum.PUBLISHER,
  });

  const res = await ApiUtils.getData<FindPublisherData>(url!, token);

  return res;
};

export default getPublishers;
