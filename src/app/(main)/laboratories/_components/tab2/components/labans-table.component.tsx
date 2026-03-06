/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { LabanPropertiesEnum } from "@/enums/api/laboratories-analyses/laban-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* LabansTable */
const LabansTable: React.FC<{
  data: GenericSuccessResponse<FindLabanData>;
  setLaban: Dispatch<SetStateAction<FindLabanData | undefined>>;
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
  const labanNameDIAndKey: keyof FindLabanData = "labanName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (FindLabanData & { key: string })[] = props.data.data.map(
    (value) => {
      return {
        key: value.labanId,
        labanId: value.labanId,
        labanName: value.labanName,
      };
    },
  );
  /**
   *
   */

  /**
   * Colunas da tabela.
   */
  const columns: TableProps<(typeof dataSource)[0]>["columns"] = [
    {
      dataIndex: labanNameDIAndKey,
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
      key: labanNameDIAndKey,
      onFilter: (value, record) =>
        record.labanName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      render: (_, record) => record.labanName,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.labanName.localeCompare(b.labanName),
      title: LabanPropertiesEnum.NAME,
    },
    {
      ...actionsColumnOptions,
      render: (_, record) => (
        <ActionsColumn
          deleteOnClick={() => {
            props.setLaban(record);
            props.setShowDeleteModal(true);
          }}
          updateOnClick={() => {
            props.setLaban(record);
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
      scroll={{ x: "max-content" }}
    />
  );
};

export default LabansTable;
