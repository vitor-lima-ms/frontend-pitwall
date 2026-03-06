/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { UnitPropertiesEnum } from "@/enums/api/units/un-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UnitsTable */
const UnitsTable: React.FC<{
  data: GenericSuccessResponse<FindUnitData>;
  setUn: Dispatch<SetStateAction<FindUnitData | undefined>>;
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
  const unNameDIAndKey: keyof FindUnitData = "unName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Pick<FindUnitData, "unName"> & { key: string })[] =
    props.data.data.map((value) => {
      return {
        key: value.unId,
        unName: value.unName,
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
      dataIndex: unNameDIAndKey,
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
      key: unNameDIAndKey,
      onFilter: (value, record) =>
        record.unName.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.unName.localeCompare(b.unName),
      title: UnitPropertiesEnum.NAME,
    },
    {
      ...actionsColumnOptions,
      render: (_, { unName, key }) => (
        <ActionsColumn
          deleteOnClick={() => {
            props.setUn({
              unId: key,
              unName,
            });

            props.setShowDeleteModal(true);
          }}
          updateOnClick={() => {
            props.setUn({
              unId: key,
              unName,
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

export default UnitsTable;
