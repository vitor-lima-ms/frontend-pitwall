/* Enum imports */
import { HttpMethodsEnum } from "@/enums/api/http-methods.enum";
import { HttpStatusEnum } from "@/enums/api/http-status.enum";
/* GenericErrorResponse */
export default interface GenericErrorResponse {
  details: string;
  method: HttpMethodsEnum;
  path: string;
  statusCode: HttpStatusEnum;
  statusMessage: keyof HttpStatusEnum;
  success: boolean;
  timestamp: { date: string; time: string };
}
