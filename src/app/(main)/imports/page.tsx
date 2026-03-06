"use client";
/* API imports */
import getImports from "./_api/get-imps";
/* Component imports */
import DeleteImportModal from "./_components/delete-imp-modal.component";
import ImportsTable from "./_components/imps-table.component";
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
import FindImportData from "@/responses/imports/find-imp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Import */
const Import: React.FC = () => {
  /**
   * Definindo o título da página.
   */
  useTitle(PluralPagesNamesEnum.IMPORT);
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
  const [deleteButtonFromModalIsClicked, setDeleteButtonFromModalIsClicked] =
    useState(false);

  const [imp, setImp] = useState<FindImportData>();

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [getSuccessResponse, setGetSuccessResponse] =
    useState<GenericSuccessResponse<FindImportData>>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  const { loading, run } = useRequest(() => getImports(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        setGetSuccessResponse(data as GenericSuccessResponse<FindImportData>);

        message.success(FeedbackEnum.SUCCESS_ON_FETCH);
      } else {
        setErrorResponse(data as GenericErrorResponse);
      }
    },
    ready: !!data?.accessToken,
    refreshDeps: [data?.accessToken],
  });

  if (deleteButtonFromModalIsClicked) {
    setDeleteButtonFromModalIsClicked(false);

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
          {showDeleteModal && (
            <DeleteImportModal
              impId={imp?.impId}
              impName={imp?.impName}
              setDeleteButtonIsClicked={setDeleteButtonFromModalIsClicked}
              setErrorResponse={setErrorResponse}
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
            />
          )}

          <ImportsTable
            data={getSuccessResponse}
            setImp={setImp}
            setShowDeleteModal={setShowDeleteModal}
          />
        </Flex>
      </Spin>
    );
  }
};

export default Import;
