"use client";
/* API imports */
import getGenericParameters from "./_api/gp/get-gps";
/* Component imports */
import CreateGenericParameterModal from "./_components/tab1/components/gp/create-gp-modal.component";
import CreateQsfgpModal from "./_components/tab2/components/qsfgp/create-qsfgp-modal.component";
import DeleteGenericParameterModal from "./_components/tab1/components/gp/delete-gp-modal.component";
import DeleteQsfgpModal from "./_components/tab2/components/qsfgp/delete-qsfgp-modal.component";
import Tab1 from "./_components/tab1/tab1.component";
import Tab2 from "./_components/tab2/tab2.component";
import UpdateGenericParameterModal from "./_components/tab1/components/gp/update-gp-modal.component";
import UpdateQsfgpModal from "./_components/tab2/components/qsfgp/update-qsfgp-modal.component";
/* Context imports */
import GpContext from "./_context/gp-context";
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
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* GenericParameter */
const GenericParameter: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.GENERIC_PARAMETER);
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

  const [getSuccessResponse, setGetSuccessResponse] =
    useState<GenericSuccessResponse<FindGenericParameterData>>();

  const [gp, setGp] =
    useState<Pick<FindGenericParameterData, "gpId" | "gpName">>();

  const [qsfgp, setQsfgp] = useState<FindGenericParameterData["gpQsfgps"][0]>();

  const [showGpCreateModal, setShowGpCreateModal] = useState(false);

  const [showGpDeleteModal, setShowGpDeleteModal] = useState(false);

  const [showGpUpdateModal, setShowGpUpdateModal] = useState(false);

  const [showQsfgpCreateModal, setShowQsfgpCreateModal] = useState(false);

  const [showQsfgpDeleteModal, setShowQsfgpDeleteModal] = useState(false);

  const [showQsfgpUpdateModal, setShowQsfgpUpdateModal] = useState(false);

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
    () => getGenericParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          setGetSuccessResponse(
            data as GenericSuccessResponse<FindGenericParameterData>,
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
      <GpContext
        value={{
          gp,
          qsfgp,
          setCreateButtonFromModalIsClicked,
          setDeleteButtonFromModalIsClicked,
          setErrorResponse,
          setGp,
          setQsfgp,
          setShowGpCreateModal,
          setShowGpDeleteModal,
          setShowGpUpdateModal,
          setShowQsfgpCreateModal,
          setShowQsfgpDeleteModal,
          setShowQsfgpUpdateModal,
          setUpdateButtonFromModalIsClicked,
          showGpCreateModal,
          showGpDeleteModal,
          showGpUpdateModal,
          showQsfgpCreateModal,
          showQsfgpDeleteModal,
          showQsfgpUpdateModal,
          tablesData: getSuccessResponse!,
        }}
      >
        <Spin spinning={loading}>
          {showGpCreateModal && <CreateGenericParameterModal />}

          {showQsfgpCreateModal && <CreateQsfgpModal />}

          {showGpDeleteModal && <DeleteGenericParameterModal />}

          {showQsfgpDeleteModal && <DeleteQsfgpModal />}

          {showGpUpdateModal && <UpdateGenericParameterModal />}

          {showQsfgpUpdateModal && <UpdateQsfgpModal />}

          <Tabs
            activeKey={activeTab}
            items={[
              {
                children: <Tab1 />,
                key: "1",
                label: PluralPagesNamesEnum.GENERIC_PARAMETER,
              },
              {
                children: <Tab2 />,
                key: "2",
                label: "Padrões de qualidade",
              },
            ]}
            onTabClick={(activeKey) => setActiveTab(activeKey)}
          />
        </Spin>
      </GpContext>
    );
  }
};

export default GenericParameter;
