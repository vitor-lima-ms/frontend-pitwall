/* React imports */
import { createContext, Dispatch, SetStateAction } from "react";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* GpContext */
const GpContext = createContext<{
  gp: Pick<FindGenericParameterData, "gpId" | "gpName"> | undefined;
  qsfgp: FindGenericParameterData["gpQsfgps"][0] | undefined;
  setCreateButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setDeleteButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setGp: Dispatch<
    SetStateAction<
      Pick<FindGenericParameterData, "gpId" | "gpName"> | undefined
    >
  >;
  setQsfgp: Dispatch<
    SetStateAction<FindGenericParameterData["gpQsfgps"][0] | undefined>
  >;
  setShowGpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowGpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowGpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowQsfgpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowQsfgpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowQsfgpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setUpdateButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  showGpCreateModal: boolean;
  showGpDeleteModal: boolean;
  showGpUpdateModal: boolean;
  showQsfgpCreateModal: boolean;
  showQsfgpDeleteModal: boolean;
  showQsfgpUpdateModal: boolean;
  tablesData: GenericSuccessResponse<FindGenericParameterData>;
} | null>(null);

export default GpContext;
