/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* askQuestion */
const askQuestion = async (question: string, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.POST,
    url: `${ApiPathsEnum.RAG}/ask-question`,
  });

  const res = await ApiUtils.postData(
    { question } as unknown as FormData,
    url!,
    token,
  );

  return res;
};

export default askQuestion;
