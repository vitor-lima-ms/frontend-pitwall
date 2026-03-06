/* API imports */
import downloadFile from "../_api/download-file";
/* Component imports */
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import DeleteButton from "@/app/_components/buttons/delete-button.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { ImportPropertiesEnum } from "@/enums/api/imports/imp-properties.enum";
import { Button, Space, Table, theme, Tooltip, type TableProps } from "antd";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindImportData from "@/responses/imports/find-imp-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* ImportsTable */
const ImportsTable: React.FC<{
  data: GenericSuccessResponse<FindImportData>;
  setImp: Dispatch<SetStateAction<FindImportData | undefined>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  /**
   * Estilos.
   */
  const {
    token: { fontSizeSM },
  } = theme.useToken();
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
   * Data index e key para a coluna.
   */
  const impNameDIAndKey: keyof FindImportData = "impName";

  const impUploadedAtDIAndKey: keyof FindImportData = "impUploadedAt";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Pick<
    FindImportData,
    "impUploadedAt" | "impFilePath" | "impName"
  > & {
    key: string;
  })[] = props.data.data.map((value) => {
    return {
      impFilePath: value.impFilePath,
      impName: value.impName,
      impUploadedAt: value.impUploadedAt,
      key: value.impId,
    };
  });
  /**
   *
   */

  /**
   * Colunas da tabela.
   */
  const columns: TableProps<(typeof dataSource)[0]>["columns"] = [
    {
      dataIndex: impNameDIAndKey,
      filterDropdown: ({ close, confirm, selectedKeys, setSelectedKeys }) => {
        const handleSearch = () => confirm({ closeDropdown: false });

        return (
          <ColumnFilter
            close={close}
            handleSearch={handleSearch}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
          />
        );
      },
      key: impNameDIAndKey,
      onFilter: (value, record) =>
        record.impName.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.impName.localeCompare(b.impName),
      title: ImportPropertiesEnum.NAME,
    },
    {
      dataIndex: impUploadedAtDIAndKey,
      key: impUploadedAtDIAndKey,
      render: (_, record) => {
        if (record.impUploadedAt) {
          return new Date(record.impUploadedAt).toLocaleString("pt-BR");
        }
        return "";
      },
      title: ImportPropertiesEnum.UPLOADED_AT,
    },
    {
      ...actionsColumnOptions,
      render: (_, { impFilePath, impName, impUploadedAt, key }) => (
        <Space size="large">
          <DeleteButton
            onClick={() => {
              props.setImp({
                impFilePath,
                impId: key,
                impName,
                impUploadedAt,
              });

              props.setShowDeleteModal(true);
            }}
          />

          <Tooltip placement="left" title="Download">
            <Button
              color="primary"
              icon={Icons.download}
              onClick={() => {
                const data_ = {
                  filePath: impFilePath,
                };

                downloadFile(
                  data_ as unknown as FormData,
                  impName,
                  data?.accessToken,
                );
              }}
              variant="link"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  /**
   *
   */

  return (
    <Table<(typeof dataSource)[0]>
      columns={columns}
      dataSource={dataSource}
      pagination={{
        ...antdPaginationOptions,
        showTotal: (total, range) => (
          <ShowTotal fontSize={fontSizeSM} range={range} total={total} />
        ),
      }}
    />
  );
};

export default ImportsTable;
