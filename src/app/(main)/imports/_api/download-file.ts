/* Enum imports */
import { ApiPathsEnum } from "@/enums/api/api-paths.enum";
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
/* Util imports */
import ApiUtils from "@/utils/api.utils";
/* downloadFile */
const downloadFile = async (
  formData: FormData,
  fileName: string,
  token?: string,
) => {
  const url = ApiUtils.generateUrlForApiCalls({
    method: HttpMethodsEnum.POST,
    url: `${ApiPathsEnum.IMPORT}/download-file`,
  });

  const res = await ApiUtils.downloadFile(formData, url!, token);

  const urlToDownloadXLSX = window.URL.createObjectURL(new Blob([res]));

  const link = document.createElement("a");

  link.href = urlToDownloadXLSX;

  link.setAttribute("download", `${fileName}.xlsx`);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export default downloadFile;
