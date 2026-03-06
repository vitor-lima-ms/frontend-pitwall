/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import GpContext from "../../../_context/gp-context";
/* Enum imports */
import { GenericParameterPropertiesEnum } from "@/enums/api/generic-parameters/gp-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
/* GenericParametersTable */
const GenericParametersTable: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(GpContext);
  /**
   *
   */

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
  const gpNameDIAndKey: keyof FindGenericParameterData = "gpName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Pick<FindGenericParameterData, "gpName" | "gpQsfgps"> & {
    key: string;
  })[] = context!.tablesData.data.map((value) => {
    return {
      key: value.gpId,
      gpName: value.gpName,
      gpQsfgps: value.gpQsfgps,
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
      dataIndex: gpNameDIAndKey,
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
      key: gpNameDIAndKey,
      onFilter: (value, record) =>
        record.gpName.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.gpName.localeCompare(b.gpName),
      title: GenericParameterPropertiesEnum.NAME,
    },
    {
      ...actionsColumnOptions,
      render: (_, { gpName, key }) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setGp({
              gpId: key,
              gpName,
            });

            context!.setShowGpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setGp({
              gpId: key,
              gpName,
            });

            context!.setShowGpUpdateModal(true);
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

export default GenericParametersTable;
