/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { EnvironmentalMatrixPropertiesEnum } from "@/enums/api/environmental-matrices/em-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindEnvironmentalMatrixData from "@/responses/environmental-matrices/find-em-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* EnvironmentalMatricesTable */
const EnvironmentalMatricesTable: React.FC<{
  data: GenericSuccessResponse<FindEnvironmentalMatrixData>;
  setEm: Dispatch<SetStateAction<FindEnvironmentalMatrixData | undefined>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
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
   * Data index e key para a coluna.
   */
  const emNameDIAndKey: keyof FindEnvironmentalMatrixData = "emName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Pick<FindEnvironmentalMatrixData, "emName"> & {
    key: string;
  })[] = props.data.data.map((value) => {
    return {
      key: value.emId,
      emName: value.emName,
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
      dataIndex: emNameDIAndKey,
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
      key: emNameDIAndKey,
      onFilter: (value, record) =>
        record.emName.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.emName.localeCompare(b.emName),
      title: EnvironmentalMatrixPropertiesEnum.NAME,
    },
    {
      ...actionsColumnOptions,
      render: (_, { emName, key }) => (
        <ActionsColumn
          deleteOnClick={() => {
            props.setEm({
              emId: key,
              emName,
            });

            props.setShowDeleteModal(true);
          }}
          updateOnClick={() => {
            props.setEm({
              emId: key,
              emName,
            });

            props.setShowUpdateModal(true);
          }}
        />
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

export default EnvironmentalMatricesTable;
