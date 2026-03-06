"use client";
/* API imports */
import getEnvironmentalMatrices from "./_api/get-ems";
/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import CreateEnvironmentalMatrixModal from "./_components/create-em-modal.component";
import DeleteEnvironmentalMatrixModal from "./_components/delete-em-modal.component";
import EnvironmentalMatricesTable from "./_components/ems-table.component";
import UpdateEnvironmentalMatrixModal from "./_components/update-em-modal.component";
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
import FindEnvironmentalMatrixData from "@/responses/environmental-matrices/find-em-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* EnvironmentalMatrix */
const EnvironmentalMatrix: React.FC = () => {
  /**
   * Definindo o título da página.
   */
  useTitle(PluralPagesNamesEnum.ENVIRONMENTAL_MATRIX);
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

  const [em, setEm] = useState<FindEnvironmentalMatrixData>();

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [getSuccessResponse, setGetSuccessResponse] =
    useState<GenericSuccessResponse<FindEnvironmentalMatrixData>>();

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
  const { loading, run } = useRequest(
    () => getEnvironmentalMatrices(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          setGetSuccessResponse(
            data as GenericSuccessResponse<FindEnvironmentalMatrixData>,
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
      <Spin spinning={loading}>
        <Flex gap="middle" vertical>
          <CreateButton onClick={() => setShowCreateModal(true)} />

          {showCreateModal && (
            <CreateEnvironmentalMatrixModal
              setCreateButtonIsClicked={setCreateButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
            />
          )}

          {showDeleteModal && (
            <DeleteEnvironmentalMatrixModal
              emId={em?.emId}
              emName={em?.emName}
              setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
            />
          )}

          {showUpdateModal && (
            <UpdateEnvironmentalMatrixModal
              environmentalMatrix={em}
              setErrorResponse={setErrorResponse}
              setShowUpdateModal={setShowUpdateModal}
              setUpdateButtonIsClicked={setUpdateButtonFromModalIsClicked}
              showUpdateModal={showUpdateModal}
            />
          )}

          <EnvironmentalMatricesTable
            data={getSuccessResponse}
            setEm={setEm}
            setShowDeleteModal={setShowDeleteModal}
            setShowUpdateModal={setShowUpdateModal}
          />
        </Flex>
      </Spin>
    );
  }
};

export default EnvironmentalMatrix;
