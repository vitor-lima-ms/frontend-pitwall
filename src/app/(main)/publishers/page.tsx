"use client";
/* API imports */
import getPublishers from "./_api/get-pubs";
/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import CreatePublisherModal from "./_components/create-pub-modal.component";
import DeletePublisherModal from "./_components/delete-pub-modal.component";
import PublishersTable from "./_components/pubs-table.component";
import UpdatePublisherModal from "./_components/update-pub-modal.component";
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
import FindPublisherData from "@/responses/publishers/find-pub-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Publisher */
const Publisher: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.PUBLISHER);
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
    useState<GenericSuccessResponse<FindPublisherData>>();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [pub, setPub] = useState<FindPublisherData>();

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
  const { loading, run } = useRequest(() => getPublishers(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        setGetSuccessResponse(
          data as GenericSuccessResponse<FindPublisherData>,
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
            <CreatePublisherModal
              setCreateButtonIsClicked={setCreateButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
            />
          )}

          {showDeleteModal && (
            <DeletePublisherModal
              pubId={pub?.pubId}
              pubName={pub?.pubName}
              setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
            />
          )}

          {showUpdateModal && (
            <UpdatePublisherModal
              publisher={pub}
              setErrorResponse={setErrorResponse}
              setShowUpdateModal={setShowUpdateModal}
              setUpdateButtonIsClicked={setUpdateButtonFromModalIsClicked}
              showUpdateModal={showUpdateModal}
            />
          )}

          <PublishersTable
            data={getSuccessResponse}
            setPub={setPub}
            setShowDeleteModal={setShowDeleteModal}
            setShowUpdateModal={setShowUpdateModal}
          />
        </Flex>
      </Spin>
    );
  }
};

export default Publisher;
