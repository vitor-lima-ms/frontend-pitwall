"use client";
/* Component imports */
import EPAEvaluationTable from "./_components/epa-evaluation-table.component";
import EPAHorizontalImportMappingModal from "./_components/epa-horizontal-import-mapping-modal.component";
import ImportButton from "@/app/_components/buttons/import-button.component";
/* Enum imports */
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import { App, Flex, Upload } from "antd";
import { useSession } from "next-auth/react";
import { useTitle } from "ahooks";
/* React imports */
import { useEffect, useState } from "react";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
import EPAEvaluation from "@/responses/app-utils/epa-evaluation.response";
import EPAHorizontalImportMapping from "@/responses/app-utils/epa-horizontal-import-mapping.reponse";
/* EPA */
const EPA: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.EPA);
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
  const [EPAEvaluation, setEPAEvaluation] =
    useState<GenericSuccessResponse<EPAEvaluation>>();

  const [EPAHorizontalImportMapping, setEPAHorizontalImportMapping] =
    useState<EPAHorizontalImportMapping>();

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [
    showEPAHorizontalImportMappingModal,
    setShowEPAHorizontalImportMappingModal,
  ] = useState(false);

  const [showUploadList, setShowUploadList] = useState(false);
  /**
   *
   */

  /**
   * Antd App Wrapper.
   */
  const { notification } = App.useApp();
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

  return (
    <Flex gap="middle" vertical>
      <Flex gap="middle">
        <Upload
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          action={`${process.env.NEXT_PUBLIC_BASE_URL}/app-utils/import-epa-horizontal-mapping-and-validation`}
          headers={{
            Authorization: `Bearer ${data?.accessToken}`,
          }}
          maxCount={1}
          name="file"
          onChange={(info) => {
            const successResponse = info.file
              .response as GenericSuccessResponse<EPAHorizontalImportMapping>;

            if (info.file.status === "error") {
              setErrorResponse(info.file.response);
            } else if (info.file.status === "uploading") {
              setShowUploadList(true);
            } else if (info.file.status === "done") {
              setShowUploadList(false);

              setEPAHorizontalImportMapping({
                filePath: successResponse.data[0].filePath,
                mapping: successResponse.data[0].mapping,
              });

              setShowEPAHorizontalImportMappingModal(true);
            }
          }}
          showUploadList={showUploadList}
        >
          <ImportButton
            onClick={() => {}}
            tooltipTitle="Importar (horizontal)"
          />
        </Upload>
      </Flex>

      {showEPAHorizontalImportMappingModal && (
        <EPAHorizontalImportMappingModal
          EPAHorizontalImportMapping={EPAHorizontalImportMapping}
          setEPAEvaluation={setEPAEvaluation}
          setErrorResponse={setErrorResponse}
          setShowEPAHorizontalImportMappingModal={
            setShowEPAHorizontalImportMappingModal
          }
          showEPAHorizontalImportMappingModal={
            showEPAHorizontalImportMappingModal
          }
        />
      )}

      {EPAEvaluation && <EPAEvaluationTable data={EPAEvaluation} />}
    </Flex>
  );
};

export default EPA;
