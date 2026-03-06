/* React imports */
import { createContext, Dispatch, SetStateAction } from "react";
/* Response imports */
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* TpContext */
const TpContext = createContext<{
  setCreateButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setDeleteButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowSotpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowSotpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowSotpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowTpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowTpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowTpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setSotp: Dispatch<
    SetStateAction<FindToxicParameterData["tpSotps"][0] | undefined>
  >;
  setTp: Dispatch<SetStateAction<FindToxicParameterData | undefined>>;
  setTpIdAndName: Dispatch<
    SetStateAction<Pick<FindToxicParameterData, "tpId" | "tpName"> | undefined>
  >;
  setUpdateButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  showSotpCreateModal: boolean;
  showSotpDeleteModal: boolean;
  showSotpUpdateModal: boolean;
  showTpCreateModal: boolean;
  showTpDeleteModal: boolean;
  showTpUpdateModal: boolean;
  sotp: FindToxicParameterData["tpSotps"][0] | undefined;
  tablesData: GenericSuccessResponse<FindToxicParameterData>;
  tp: FindToxicParameterData | undefined;
  tpIdAndName: Pick<FindToxicParameterData, "tpId" | "tpName"> | undefined;
} | null>(null);

export default TpContext;
