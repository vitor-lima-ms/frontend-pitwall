/* Component imports */
import CreateButton from "@/app/_components/buttons/create-button.component";
import ImportButton from "@/app/_components/buttons/import-button.component";
import SmpsTable from "./components/table/smps-table.component";
/* Context imports */
import SpContext from "../../_context/sp-context";
/* Other libraries imports */
import { Flex, Upload } from "antd";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Response imports */
import GenericSuccessResponse from "@/responses/generic-success.response";
import HorizontalImportMapping from "@/responses/samples/horizontal-import-mapping.response";
/* Tab2 */
const Tab2: React.FC = () => {
  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

  /**
   * Context.
   */
  const context = useContext(SpContext);
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [showUploadList, setShowUploadList] = useState(false);
  /**
   *
   */

  return (
    <Flex gap="middle" vertical>
      <Flex gap="middle">
        <CreateButton onClick={() => context!.setShowSmpCreateModal(true)} />

        <Upload
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          action={`${process.env.NEXT_PUBLIC_BASE_URL}/samples/import-samples-horizontal-mapping-and-validation`}
          headers={{
            Authorization: `Bearer ${data?.accessToken}`,
          }}
          maxCount={1}
          name="file"
          onChange={(info) => {
            const successResponse = info.file
              .response as GenericSuccessResponse<HorizontalImportMapping>;

            if (info.file.status === "error") {
              context!.setErrorResponse(info.file.response);
            } else if (info.file.status === "uploading") {
              setShowUploadList(true);
            } else if (info.file.status === "done") {
              setShowUploadList(false);

              context!.setImportMapping({
                filePath: successResponse.data[0].filePath,
                mapping: successResponse.data[0].mapping,
              });

              context!.setShowHorizontalImportMappingModal(true);
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

      <SmpsTable />
    </Flex>
  );
};

export default Tab2;
