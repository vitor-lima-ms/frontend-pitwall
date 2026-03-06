/* React imports */
import { createContext, Dispatch, SetStateAction } from "react";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
import HorizontalImportMapping from "@/responses/samples/horizontal-import-mapping.response";
/* SpContext */
const SpContext = createContext<{
  generateReportButtonIsClicked: boolean;
  gposmp: FindSamplingPointData["spSamples"][0]["smpGposmps"][0] | undefined;
  importMapping: HorizontalImportMapping | undefined;
  setClassifyButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setCreateButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setDeleteButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setGenerateReportButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  setGposmp: Dispatch<
    SetStateAction<
      FindSamplingPointData["spSamples"][0]["smpGposmps"][0] | undefined
    >
  >;
  setImportButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  setImportMapping: Dispatch<SetStateAction<HorizontalImportMapping | undefined>>;
  setShowClassificationModal: Dispatch<SetStateAction<boolean>>;
  setShowGposmpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowGposmpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowGposmpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowHorizontalImportMappingModal: Dispatch<SetStateAction<boolean>>;
  setTposmp: Dispatch<
    SetStateAction<
      FindSamplingPointData["spSamples"][0]["smpTposmps"][0] | undefined
    >
  >;
  setShowTposmpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowTposmpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowTposmpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowSmpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowSmpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowSmpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowSpCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowSpDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowSpUpdateModal: Dispatch<SetStateAction<boolean>>;
  setSmp: Dispatch<
    SetStateAction<FindSamplingPointData["spSamples"][0] | undefined>
  >;
  setSmpId: Dispatch<
    SetStateAction<
      Pick<FindSamplingPointData["spSamples"][0], "smpId"> | undefined
    >
  >;
  setSp: Dispatch<SetStateAction<FindSamplingPointData | undefined>>;
  setSpIdAndName: Dispatch<
    SetStateAction<Pick<FindSamplingPointData, "spId" | "spName"> | undefined>
  >;
  setUpdateButtonFromModalIsClicked: Dispatch<SetStateAction<boolean>>;
  showClassificationModal: boolean;
  showGposmpCreateModal: boolean;
  showGposmpDeleteModal: boolean;
  showGposmpUpdateModal: boolean;
  showHorizontalImportMappingModal: boolean;
  showTposmpCreateModal: boolean;
  showTposmpDeleteModal: boolean;
  showTposmpUpdateModal: boolean;
  showSmpCreateModal: boolean;
  showSmpDeleteModal: boolean;
  showSmpUpdateModal: boolean;
  showSpCreateModal: boolean;
  showSpDeleteModal: boolean;
  showSpUpdateModal: boolean;
  tposmp: FindSamplingPointData["spSamples"][0]["smpTposmps"][0] | undefined;
  smp: FindSamplingPointData["spSamples"][0] | undefined;
  smpId: Pick<FindSamplingPointData["spSamples"][0], "smpId"> | undefined;
  sp: FindSamplingPointData | undefined;
  spIdAndName: Pick<FindSamplingPointData, "spId" | "spName"> | undefined;
  tablesData: GenericSuccessResponse<FindSamplingPointData>;
} | null>(null);

export default SpContext;
