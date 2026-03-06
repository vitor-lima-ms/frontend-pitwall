"use client";
/* API imports */
import getToxicParameters from "./_api/tp/get-tps";
/* Component imports */
import CreateSotpModal from "./_components/tab2/components/sotp/create-sotp-modal.component";
import CreateToxicParameterModal from "./_components/tab1/components/tp/create-tp-modal.component";
import DeleteSotpModal from "./_components/tab2/components/sotp/delete-sotp-modal.component";
import DeleteToxicParameterModal from "./_components/tab1/components/tp/delete-tp-modal.component";
import Tab1 from "./_components/tab1/tab1.component";
import Tab2 from "./_components/tab2/tab2.component";
import UpdateSotpModal from "./_components/tab2/components/sotp/update-sotp-modal.component";
import UpdateToxicParameterModal from "./_components/tab1/components/tp/update-tp-modal.component";
/* Context imports */
import TpContext from "./_context/tp-context";
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
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* ToxicParameter */
const ToxicParameter: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.TOXIC_PARAMETER);
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
    useState<GenericSuccessResponse<FindToxicParameterData>>();

  const [showSotpCreateModal, setShowSotpCreateModal] = useState(false);

  const [showSotpDeleteModal, setShowSotpDeleteModal] = useState(false);

  const [showSotpUpdateModal, setShowSotpUpdateModal] = useState(false);

  const [showTpCreateModal, setShowTpCreateModal] = useState(false);

  const [showTpDeleteModal, setShowTpDeleteModal] = useState(false);

  const [showTpUpdateModal, setShowTpUpdateModal] = useState(false);

  const [sotp, setSotp] = useState<FindToxicParameterData["tpSotps"][0]>();

  const [tp, setTp] = useState<FindToxicParameterData>();

  const [tpIdAndName, setTpIdAndName] =
    useState<Pick<FindToxicParameterData, "tpId" | "tpName">>();

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
    () => getToxicParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          setGetSuccessResponse(
            data as GenericSuccessResponse<FindToxicParameterData>,
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
      <TpContext
        value={{
          setCreateButtonFromModalIsClicked,
          setDeleteButtonFromModalIsClicked,
          setErrorResponse,
          setShowSotpCreateModal,
          setShowSotpDeleteModal,
          setShowSotpUpdateModal,
          setShowTpCreateModal,
          setShowTpDeleteModal,
          setShowTpUpdateModal,
          setUpdateButtonFromModalIsClicked,
          showSotpCreateModal,
          showSotpDeleteModal,
          showSotpUpdateModal,
          showTpCreateModal,
          showTpDeleteModal,
          showTpUpdateModal,
          setSotp,
          setTp,
          setTpIdAndName,
          sotp,
          tablesData: getSuccessResponse!,
          tp,
          tpIdAndName,
        }}
      >
        <Spin spinning={loading}>
          {showSotpCreateModal && <CreateSotpModal />}

          {showTpCreateModal && <CreateToxicParameterModal />}

          {showSotpDeleteModal && <DeleteSotpModal />}

          {showTpDeleteModal && <DeleteToxicParameterModal />}

          {showSotpUpdateModal && <UpdateSotpModal />}

          {showTpUpdateModal && <UpdateToxicParameterModal />}

          <Tabs
            activeKey={activeTab}
            items={[
              {
                children: <Tab1 />,
                key: "1",
                label: PluralPagesNamesEnum.TOXIC_PARAMETER,
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
      </TpContext>
    );
  }
};

export default ToxicParameter;
