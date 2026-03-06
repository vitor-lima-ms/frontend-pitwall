"use client";
/* API imports */
import getRegulations from "./_api/get-regs";
/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import CreateRegulationModal from "./_components/create-reg-modal.component";
import DeleteRegulationModal from "./_components/delete-reg-modal.component";
import RegulationsTable from "./_components/regs-table.component";
import UpdateRegulationModal from "./_components/update-reg-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import { App, Flex, Spin } from "antd";
import { useRequest, useTitle } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useEffect, useState } from "react";
/* Response imports */
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Regulation */
const Regulation: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.REGULATION);
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
  const [createButtonFromModalIsClicked, setCreateButtonFromModalIsClicked] =
    useState(false);

  const [deleteButtonFromModalIsClicked, setDeleteButtonFromModalIsClicked] =
    useState(false);

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [getSuccessResponse, setGetSuccessResponse] =
    useState<GenericSuccessResponse<FindRegulationData>>();

  const [reg, setReg] = useState<FindRegulationData>();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
  const { loading, run } = useRequest(() => getRegulations(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        setGetSuccessResponse(
          data as GenericSuccessResponse<FindRegulationData>,
        );

        message.success(FeedbackEnum.SUCCESS_ON_FETCH);
      } else {
        setErrorResponse(data as GenericErrorResponse);
      }
    },
    ready: !!data?.accessToken,
    refreshDeps: [data?.accessToken],
  });

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
      <Spin spinning={loading}>
        <Flex gap="middle" vertical>
          <CreateButton onClick={() => setShowCreateModal(true)} />

          {showCreateModal && (
            <CreateRegulationModal
              setCreateButtonIsClicked={setCreateButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
            />
          )}

          {showDeleteModal && (
            <DeleteRegulationModal
              regId={reg?.regId}
              regIdentifier={reg?.regIdentifier}
              setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
            />
          )}

          {showUpdateModal && (
            <UpdateRegulationModal
              regulation={reg}
              setErrorResponse={setErrorResponse}
              setShowUpdateModal={setShowUpdateModal}
              setUpdateButtonIsClicked={setUpdateButtonFromModalIsClicked}
              showUpdateModal={showUpdateModal}
            />
          )}

          <RegulationsTable
            data={getSuccessResponse}
            setReg={setReg}
            setShowDeleteModal={setShowDeleteModal}
            setShowUpdateModal={setShowUpdateModal}
          />
        </Flex>
      </Spin>
    );
  }
};

export default Regulation;
