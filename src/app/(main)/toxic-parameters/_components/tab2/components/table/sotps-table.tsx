import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import TpSotpExpand from "./tp-sotps-expand.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import TpContext from "@/app/(main)/toxic-parameters/_context/tp-context";
/* Enum imports */
import { ToxicParameterPropertiesEnum } from "@/enums/api/toxic-parameters/tp-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
/* SotpsTable */
const SotpsTable: React.FC = () => {
  /**
   * Context.
   */
  const context = useContext(TpContext);
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
  const tpCasNumberDIAndKey: keyof FindToxicParameterData = "tpCasNumber";

  const tpEcCodeDIAndKey: keyof FindToxicParameterData = "tpEcCode";

  const tpNameDIAndKey: keyof FindToxicParameterData = "tpName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<FindToxicParameterData, "tpId"> & {
    key: string;
  })[] = context!.tablesData.data.map((value) => {
    return {
      key: value.tpId,
      tpCasNumber: value.tpCasNumber,
      tpEcCode: value.tpEcCode,
      tpName: value.tpName,
      tpSotps: value.tpSotps,
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
      dataIndex: tpCasNumberDIAndKey,
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
      key: tpCasNumberDIAndKey,
      onFilter: (value, record) =>
        record
          .tpCasNumber!.toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.tpCasNumber!.localeCompare(b.tpCasNumber!),
      title: ToxicParameterPropertiesEnum.CAS_NUMBER,
    },
    {
      dataIndex: tpEcCodeDIAndKey,
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
      key: tpEcCodeDIAndKey,
      onFilter: (value, record) =>
        record
          .tpEcCode!.toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.tpEcCode!.localeCompare(b.tpEcCode!),
      title: ToxicParameterPropertiesEnum.EC_CODE,
    },
    {
      dataIndex: tpNameDIAndKey,
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
      key: tpNameDIAndKey,
      onFilter: (value, record) =>
        record.tpName.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.tpName.localeCompare(b.tpName),
      title: ToxicParameterPropertiesEnum.NAME,
    },
  ];
  /**
   *
   */

  return (
    <Table<(typeof dataSource)[0]>
      columns={columns}
      dataSource={dataSource}
      expandable={{
        expandedRowRender: ({ key, tpName, tpSotps }) => (
          <TpSotpExpand data={tpSotps} tpId={key} tpName={tpName} />
        ),
      }}
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

export default SotpsTable;
