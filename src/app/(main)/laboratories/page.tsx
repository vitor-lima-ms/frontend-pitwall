"use client";
/* API imports */
import getLabans from "./_api/laban/get-labans";
import getLaboratories from "./_api/lab/get-labs";
/* Component imports */
import CreateLaboratoryModal from "./_components/tab1/components/create-lab-modal.component";
import CreateLabanModal from "./_components/tab2/components/create-laban-modal.component";
import DeleteLaboratoryModal from "./_components/tab1/components/delete-lab-modal.component";
import DeleteLabanModal from "./_components/tab2/components/delete-laban-modal.component";
import GenerateAnalysisRequestModal from "./_components/tab1/components/generate-analysis-request.component";
import Tab1 from "./_components/tab1/tab1.component";
import Tab2 from "./_components/tab2/tab2.component";
import UpdateLaboratoryModal from "./_components/tab1/components/update-lab-modal.component";
import UpdateLabanModal from "./_components/tab2/components/update-laban-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import { App, Spin, Tabs } from "antd";
import { useRequest, useTitle } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useEffect, useState } from "react";
/* Response import */
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
import FindLaboratoryData from "@/responses/laboratories/find-lab-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Laboratory */
const Laboratory: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.LABORATORY);
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

  const [createButtonFromModalIsClicked, setCreateButtonFromModalIsClicked] =
    useState(false);

  const [deleteButtonFromModalIsClicked, setDeleteButtonFromModalIsClicked] =
    useState(false);

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [getLabsSuccessResponse, setGetLabsSuccessResponse] =
    useState<GenericSuccessResponse<FindLaboratoryData>>();

  const [getLabansSuccessResponse, setGetLabansSuccessResponse] =
    useState<GenericSuccessResponse<FindLabanData>>();

  const [lab, setLab] = useState<FindLaboratoryData>();

  const [laban, setLaban] = useState<FindLabanData>();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showCreateLabanModal, setShowCreateLabanModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDeleteLabanModal, setShowDeleteLabanModal] = useState(false);

  const [
    showGenerateAnalysisRequestModal,
    setShowGenerateAnalysisRequestModal,
  ] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [showUpdateLabanModal, setShowUpdateLabanModal] = useState(false);

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
  const { loading: loadingLabs, run: runLabs } = useRequest(
    () => getLaboratories(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          setGetLabsSuccessResponse(
            data as GenericSuccessResponse<FindLaboratoryData>,
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

  const { loading: loadingLabans, run: runLabans } = useRequest(
    () => getLabans(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          setGetLabansSuccessResponse(
            data as GenericSuccessResponse<FindLabanData>,
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
    createButtonFromModalIsClicked ||
    deleteButtonFromModalIsClicked ||
    updateButtonFromModalIsClicked
  ) {
    setCreateButtonFromModalIsClicked(false);

    setDeleteButtonFromModalIsClicked(false);

    setUpdateButtonFromModalIsClicked(false);

    runLabans();

    runLabs();
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

  if (getLabansSuccessResponse && getLabsSuccessResponse) {
    return (
      <Spin spinning={loadingLabans || loadingLabs}>
        {showCreateModal && (
          <CreateLaboratoryModal
            setCreateButtonIsClicked={setCreateButtonFromModalIsClicked}
            setErrorResponse={setErrorResponse}
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
          />
        )}

        {showCreateLabanModal && (
          <CreateLabanModal
            setCreateButtonIsClicked={setCreateButtonFromModalIsClicked}
            setErrorResponse={setErrorResponse}
            setShowCreateModal={setShowCreateLabanModal}
            showCreateModal={showCreateLabanModal}
          />
        )}

        {showDeleteModal && (
          <DeleteLaboratoryModal
            labId={lab?.labId}
            labName={lab?.labCompanyName}
            setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
            setErrorResponse={setErrorResponse}
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          />
        )}

        {showDeleteLabanModal && (
          <DeleteLabanModal
            labanId={laban?.labanId}
            labanName={laban?.labanName}
            setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
            setErrorResponse={setErrorResponse}
            setShowDeleteModal={setShowDeleteLabanModal}
            showDeleteModal={showDeleteLabanModal}
          />
        )}

        {showGenerateAnalysisRequestModal && (
          <GenerateAnalysisRequestModal
            setShowGenerateAnalysisRequestModal={
              setShowGenerateAnalysisRequestModal
            }
            showGenerateAnalysisRequestModal={showGenerateAnalysisRequestModal}
          />
        )}

        {showUpdateModal && (
          <UpdateLaboratoryModal
            laboratory={lab}
            setErrorResponse={setErrorResponse}
            setShowUpdateModal={setShowUpdateModal}
            setUpdateButtonIsClicked={setUpdateButtonFromModalIsClicked}
            showUpdateModal={showUpdateModal}
          />
        )}

        {showUpdateLabanModal && (
          <UpdateLabanModal
            laban={laban}
            setErrorResponse={setErrorResponse}
            setShowUpdateModal={setShowUpdateLabanModal}
            setUpdateButtonIsClicked={setUpdateButtonFromModalIsClicked}
            showUpdateModal={showUpdateLabanModal}
          />
        )}

        <Tabs
          activeKey={activeTab}
          items={[
            {
              children: (
                <Tab1
                  data={getLabsSuccessResponse}
                  setLab={setLab}
                  setShowCreateModal={setShowCreateModal}
                  setShowDeleteModal={setShowDeleteModal}
                  setShowGenerateAnalysisRequestModal={
                    setShowGenerateAnalysisRequestModal
                  }
                  setShowUpdateModal={setShowUpdateModal}
                  showGenerateAnalysisRequestModal={
                    showGenerateAnalysisRequestModal
                  }
                />
              ),
              key: "1",
              label: PluralPagesNamesEnum.LABORATORY,
            },
            {
              children: (
                <Tab2
                  data={getLabansSuccessResponse}
                  setLaban={setLaban}
                  setShowCreateModal={setShowCreateLabanModal}
                  setShowDeleteModal={setShowDeleteLabanModal}
                  setShowUpdateModal={setShowUpdateLabanModal}
                />
              ),
              key: "2",
              label: "Análises laboratoriais",
            },
          ]}
          onTabClick={(activeKey) => setActiveTab(activeKey)}
        />
      </Spin>
    );
  }
};

export default Laboratory;
