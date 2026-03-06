/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* generateAnalysisRequest */
const generateAnalysisRequest = async (formData: FormData, token?: string) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.POST,
    url: `${ApiPathsEnum.LABORATORY}/generate-analysis-request`,
  });

  const res = await ApiUtils.downloadFile(formData, url!, token);

  const urlToDownloadPDF = window.URL.createObjectURL(new Blob([res]));

  const link = document.createElement("a");

  link.href = urlToDownloadPDF;

  link.setAttribute("download", `analysis_request.pdf`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export default generateAnalysisRequest;
