"use client";
/* API imports */
import getSamplingPoints from "./_api/sp/get-sps";
/* Component imports */
import ClassifySampleModal from "./_components/tab2/components/smp/classify-sample-modal.component";
import CreateGposmpModal from "./_components/tab2/components/gposmp/create-gposmp-modal.component";
import CreateTposmpModal from "./_components/tab2/components/tposmp/create-tposmp-modal.component";
import CreateSampleModal from "./_components/tab2/components/smp/create-smp-modal.component";
import CreateSamplingPointModal from "./_components/tab1/components/sp/create-sp.component";
import DeleteGposmpModal from "./_components/tab2/components/gposmp/delete-gposmp-modal.component";
import DeleteTposmpModal from "./_components/tab2/components/tposmp/delete-tposmp-modal.component";
import DeleteSampleModal from "./_components/tab2/components/smp/delete-smp-modal.component";
import DeleteSamplingPointModal from "./_components/tab1/components/sp/delete-sp.component";
import HorizontalImportMappingModal from "./_components/tab2/components/smp/horizontal-import-mapping-modal.component";
import Tab1 from "./_components/tab1/tab1.component";
import Tab2 from "./_components/tab2/tab2.component";
import UpdateGposmpModal from "./_components/tab2/components/gposmp/update-gposmp.modal.component";
import UpdateTposmpModal from "./_components/tab2/components/tposmp/update-tposmp.modal.component";
import UpdateSampleModal from "./_components/tab2/components/smp/update-smp-modal.component";
import UpdateSamplingPointModal from "./_components/tab1/components/sp/update-sp.component";
/* Context imports */
import SpContext from "./_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import { App, Spin, Tabs } from "antd";
import { useRequest, useTitle } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useEffect, useState } from "react";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
import HorizontalImportMap from "@/responses/samples/horizontal-import-mapping.response";
/* SamplingPoint */
const SamplingPoint: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.SAMPLING_POINT);
  /**
   *
   */

  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [activeTab, setActiveTab] = useState("1");

  const [
    classifyButtonFromModalIsClicked,
    setClassifyButtonFromModalIsClicked,
  ] = useState(false);

  const [createButtonFromModalIsClicked, setCreateButtonFromModalIsClicked] =
    useState(false);

  const [deleteButtonFromModalIsClicked, setDeleteButtonFromModalIsClicked] =
    useState(false);

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [generateReportButtonIsClicked, setGenerateReportButtonIsClicked] =
    useState(false);

  const [getSuccessResponse, setGetSuccessResponse] =
    useState<GenericSuccessResponse<FindSamplingPointData>>();

  const [importButtonFromModalIsClicked, setImportButtonFromModalIsClicked] =
    useState(false);

  const [importMapping, setImportMapping] = useState<HorizontalImportMap>();

  const [showClassificationModal, setShowClassificationModal] = useState(false);

  const [showGposmpCreateModal, setShowGposmpCreateModal] = useState(false);

  const [showGposmpDeleteModal, setShowGposmpDeleteModal] = useState(false);

  const [showGposmpUpdateModal, setShowGposmpUpdateModal] = useState(false);

  const [
    showHorizontalImportMappingModal,
    setShowHorizontalImportMappingModal,
  ] = useState(false);

  const [showTposmpCreateModal, setShowTposmpCreateModal] = useState(false);

  const [showTposmpDeleteModal, setShowTposmpDeleteModal] = useState(false);

  const [showTposmpUpdateModal, setShowTposmpUpdateModal] = useState(false);

  const [showSmpCreateModal, setShowSmpCreateModal] = useState(false);

  const [showSmpDeleteModal, setShowSmpDeleteModal] = useState(false);

  const [showSmpUpdateModal, setShowSmpUpdateModal] = useState(false);

  const [showSpCreateModal, setShowSpCreateModal] = useState(false);

  const [showSpDeleteModal, setShowSpDeleteModal] = useState(false);

  const [showSpUpdateModal, setShowSpUpdateModal] = useState(false);

  const [gposmp, setGposmp] =
    useState<FindSamplingPointData["spSamples"][0]["smpGposmps"][0]>();

  const [tposmp, setTposmp] =
    useState<FindSamplingPointData["spSamples"][0]["smpTposmps"][0]>();

  const [smp, setSmp] = useState<FindSamplingPointData["spSamples"][0]>();

  const [smpId, setSmpId] =
    useState<Pick<FindSamplingPointData["spSamples"][0], "smpId">>();

  const [sp, setSp] = useState<FindSamplingPointData>();

  const [spIdAndName, setSpIdAndName] =
    useState<Pick<FindSamplingPointData, "spId" | "spName">>();

  const [updateButtonFromModalIsClicked, setUpdateButtonFromModalIsClicked] =
    useState(false);
  /**
   *
   */

  /**
   * Antd App Wrapper.
   */
  const { message, notification } = App.useApp();
  /**
   *
   */

  /**
   * Buscando os dados.
   */
  const { loading, run } = useRequest(
    () => getSamplingPoints(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          setGetSuccessResponse(
            data as GenericSuccessResponse<FindSamplingPointData>,
          );

          message.success(FeedbackEnum.SUCCESS_ON_FETCH);
        } else {
          setErrorResponse(data as GenericErrorResponse);
        }
      },
      ready: !!data?.accessToken,
      refreshDeps: [data?.accessToken],
    },
  );

  if (
    classifyButtonFromModalIsClicked ||
    createButtonFromModalIsClicked ||
    deleteButtonFromModalIsClicked ||
    generateReportButtonIsClicked ||
    importButtonFromModalIsClicked ||
    updateButtonFromModalIsClicked
  ) {
    setClassifyButtonFromModalIsClicked(false);

    setCreateButtonFromModalIsClicked(false);

    setDeleteButtonFromModalIsClicked(false);

    setGenerateReportButtonIsClicked(false);

    setImportButtonFromModalIsClicked(false);

    setUpdateButtonFromModalIsClicked(false);

    run();
  }
  /**
   *
   */

  /**
   * Efeito para exibir os erros.
   */
  useEffect(() => {
    if (errorResponse) {
      notification.error({ showProgress: true, title: errorResponse.details });
    }
  }, [errorResponse, notification]);
  /**
   *
   */

  if (getSuccessResponse) {
    return (
      <SpContext
        value={{
          generateReportButtonIsClicked,
          gposmp,
          importMapping,
          setClassifyButtonFromModalIsClicked,
          setCreateButtonFromModalIsClicked,
          setDeleteButtonFromModalIsClicked,
          setErrorResponse,
          setGenerateReportButtonIsClicked,
          setGposmp,
          setImportButtonFromModalIsClicked,
          setImportMapping,
          setShowClassificationModal,
          setShowGposmpCreateModal,
          setShowGposmpDeleteModal,
          setShowGposmpUpdateModal,
          setShowHorizontalImportMappingModal,
          setTposmp,
          setShowTposmpCreateModal,
          setShowTposmpDeleteModal,
          setShowTposmpUpdateModal,
          setShowSmpCreateModal,
          setShowSmpDeleteModal,
          setShowSmpUpdateModal,
          setShowSpCreateModal,
          setShowSpDeleteModal,
          setShowSpUpdateModal,
          setSmp,
          setSmpId,
          setSp,
          setSpIdAndName,
          setUpdateButtonFromModalIsClicked,
          showClassificationModal,
          showGposmpCreateModal,
          showGposmpDeleteModal,
          showGposmpUpdateModal,
          showHorizontalImportMappingModal,
          showTposmpCreateModal,
          showTposmpDeleteModal,
          showTposmpUpdateModal,
          showSmpCreateModal,
          showSmpDeleteModal,
          showSmpUpdateModal,
          showSpCreateModal,
          showSpDeleteModal,
          showSpUpdateModal,
          tposmp,
          smp,
          smpId,
          sp,
          spIdAndName,
          tablesData: getSuccessResponse,
        }}
      >
        <Spin spinning={loading}>
          {showClassificationModal && <ClassifySampleModal />}

          {showGposmpCreateModal && <CreateGposmpModal />}

          {showGposmpDeleteModal && <DeleteGposmpModal />}

          {showGposmpUpdateModal && <UpdateGposmpModal />}

          {showHorizontalImportMappingModal && <HorizontalImportMappingModal />}

          {showTposmpCreateModal && <CreateTposmpModal />}

          {showTposmpDeleteModal && <DeleteTposmpModal />}

          {showTposmpUpdateModal && <UpdateTposmpModal />}

          {showSmpCreateModal && <CreateSampleModal />}

          {showSmpDeleteModal && <DeleteSampleModal />}

          {showSmpUpdateModal && <UpdateSampleModal />}

          {showSpCreateModal && <CreateSamplingPointModal />}

          {showSpDeleteModal && <DeleteSamplingPointModal />}

          {showSpUpdateModal && <UpdateSamplingPointModal />}

          <Tabs
            activeKey={activeTab}
            items={[
              {
                children: <Tab1 />,
                key: "1",
                label: PluralPagesNamesEnum.SAMPLING_POINT,
              },
              {
                children: <Tab2 />,
                key: "2",
                label: "Amostras",
              },
            ]}
            onTabClick={(activeKey) => setActiveTab(activeKey)}
          />
        </Spin>
      </SpContext>
    );
  }
};

export default SamplingPoint;
