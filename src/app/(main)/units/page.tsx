"use client";
/* API imports */
import getUnits from "./_api/get-uns";
/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import CreateUnitModal from "./_components/create-un-modal.component";
import DeleteUnitModal from "./_components/delete-un-modal.component";
import UnitsTable from "./_components/uns-table.component";
import UpdateUnitModal from "./_components/update-un-modal.component";
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
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Unit */
const Unit: React.FC = () => {
  /**
   * Definindo o título da página.
   */
  useTitle(PluralPagesNamesEnum.UNIT);
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
    useState<GenericSuccessResponse<FindUnitData>>();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [un, setUn] = useState<FindUnitData>();

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
  const { loading, run } = useRequest(() => getUnits(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        setGetSuccessResponse(data as GenericSuccessResponse<FindUnitData>);

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
            <CreateUnitModal
              setCreateButtonIsClicked={setCreateButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
            />
          )}

          {showDeleteModal && (
            <DeleteUnitModal
              setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
              unId={un!.unId}
              unName={un!.unName}
            />
          )}

          {showUpdateModal && (
            <UpdateUnitModal
              setErrorResponse={setErrorResponse}
              setShowUpdateModal={setShowUpdateModal}
              setUpdateButtonIsClicked={setUpdateButtonFromModalIsClicked}
              showUpdateModal={showUpdateModal}
              unit={un}
            />
          )}

          <UnitsTable
            data={getSuccessResponse}
            setShowDeleteModal={setShowDeleteModal}
            setShowUpdateModal={setShowUpdateModal}
            setUn={setUn}
          />
        </Flex>
      </Spin>
    );
  }
};

export default Unit;
