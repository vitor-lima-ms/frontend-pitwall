/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* getReport */
const getReport = async (
  formData: FormData,
  id?: string,
  spName?: string,
  smpSamplingDate?: null | string,
  token?: string,
) => {
  const url = ApiUtils.generateUrlForApiCalls({
    id,
    method: HttpMethodsEnum.POST,
    url: `${ApiPathsEnum.SAMPLE}/get-report`,
  });

  const res = await ApiUtils.downloadFile(formData, url!, token);

  const urlToDownloadPDF = window.URL.createObjectURL(new Blob([res]));

  const link = document.createElement("a");

  link.href = urlToDownloadPDF;

  link.setAttribute("download", `${spName}_${smpSamplingDate}.pdf`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export default getReport;
