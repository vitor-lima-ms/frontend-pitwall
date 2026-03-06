/* Enum imports */
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
import { HttpStatusEnum } from "@/enums/api/http-status.enum";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* ApiUtils */
type GenericParamsForApiCallsType = {
  id?: string;
  method: HttpMethodsEnum;
  url: string;
};

type HeaderType = {
  Accept: string;
  Authorization?: string;
  "Content-Type": string;
};

export default class ApiUtils {
  private static baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  static async deleteData(
    url: string,
    token?: string,
  ): Promise<GenericErrorResponse | GenericSuccessResponse<string | void>> {
    const res = await fetch(url, {
      headers: this.getHeaders(token),
      method: HttpMethodsEnum.DELETE,
    });

    if (res.status >= HttpStatusEnum.BAD_REQUEST) {
      const errorResponse = (await res.json()) as GenericErrorResponse;

      return errorResponse;
    }

    const successResponse = (await res.json()) as GenericSuccessResponse<
      string | void
    >;

    return successResponse;
  }

  static generateUrlForApiCalls(
    params: GenericParamsForApiCallsType,
  ): string | void {
    if (
      (params.method === HttpMethodsEnum.GET && !params.id) ||
      (params.method === HttpMethodsEnum.POST && !params.id)
    ) {
      return `${ApiUtils.baseUrl}${params.url}`;
    }

    if (
      (params.method === HttpMethodsEnum.GET && params.id) ||
      (params.method === HttpMethodsEnum.POST && params.id)
    ) {
      return `${ApiUtils.baseUrl}${params.url}/${params.id}`;
    }

    if (
      (params.method === HttpMethodsEnum.DELETE ||
        params.method === HttpMethodsEnum.PATCH ||
        params.method === HttpMethodsEnum.PUT) &&
      !params.id
    ) {
      console.error(
        "O ID deve ser enviado se o verbo HTTP for DELETE ou PATCH!",
      );
    } else {
      return `${ApiUtils.baseUrl}${params.url}/${params.id}`;
    }
  }

  static async getData<Data = void>(
    url: string,
    token?: string,
  ): Promise<GenericErrorResponse | GenericSuccessResponse<Data>> {
    const res = await fetch(url, {
      headers: this.getHeaders(token),
      method: HttpMethodsEnum.GET,
    });

    if (res.status >= HttpStatusEnum.BAD_REQUEST) {
      const errorResponse = (await res.json()) as GenericErrorResponse;

      return errorResponse;
    }

    const successResponse = (await res.json()) as GenericSuccessResponse<Data>;

    return successResponse;
  }

  private static getHeaders(token?: string): HeaderType {
    const headers: HeaderType = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  static async downloadFile(
    formData: FormData,
    url: string,
    token?: string,
  ): Promise<Blob> {
    const res = await fetch(url, {
      body: JSON.stringify(formData),
      headers: this.getHeaders(token),
      method: HttpMethodsEnum.POST,
    });

    return await res.blob();
  }

  static async patchData(
    formData: FormData,
    url: string,
    token?: string,
  ): Promise<GenericErrorResponse | GenericSuccessResponse<string | void>> {
    const res = await fetch(url, {
      body: JSON.stringify(formData),
      headers: this.getHeaders(token),
      method: HttpMethodsEnum.PATCH,
    });

    if (res.status >= HttpStatusEnum.BAD_REQUEST) {
      const errorResponse = (await res.json()) as GenericErrorResponse;

      return errorResponse;
    }

    const successResponse = (await res.json()) as GenericSuccessResponse<
      string | void
    >;

    return successResponse;
  }

  static async postData<Data = string | void>(
    formData: FormData,
    url: string,
    token?: string,
  ): Promise<GenericErrorResponse | GenericSuccessResponse<Data>> {
    const res = await fetch(url, {
      body: JSON.stringify(formData),
      headers: this.getHeaders(token),
      method: HttpMethodsEnum.POST,
    });

    if (res.status >= HttpStatusEnum.BAD_REQUEST) {
      const errorResponse = (await res.json()) as GenericErrorResponse;

      return errorResponse;
    }

    const successResponse = (await res.json()) as GenericSuccessResponse<Data>;

    return successResponse;
  }

  static async putData<Data = void>(
    formData: FormData,
    url: string,
    token?: string,
  ): Promise<GenericErrorResponse | GenericSuccessResponse<Data>> {
    const res = await fetch(url, {
      body: JSON.stringify(formData),
      headers: this.getHeaders(token),
      method: HttpMethodsEnum.PUT,
    });

    if (res.status >= HttpStatusEnum.BAD_REQUEST) {
      const errorResponse = (await res.json()) as GenericErrorResponse;

      return errorResponse;
    }

    const successResponse = (await res.json()) as GenericSuccessResponse<Data>;

    return successResponse;
  }
}
