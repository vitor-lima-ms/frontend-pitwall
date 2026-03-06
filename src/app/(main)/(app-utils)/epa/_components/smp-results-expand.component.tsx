/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Other libraries imports */
import { Badge, Table, theme, type TableProps } from "antd";
/* Response imports */
import EPAEvaluation from "@/responses/app-utils/epa-evaluation.response";
/* SmpResultsExpand */
const SmpResultsExpand: React.FC<{
  data: EPAEvaluation["smpResults"];
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
   * Data index e key para as colunas.
   */
  const parameterNameDIAndKey: keyof EPAEvaluation["smpResults"][0] =
    "parameterName";

  const parameterLimitDIAndKey: keyof EPAEvaluation["smpResults"][0] =
    "parameterLimit";

  const parameterResultDIAndKey: keyof EPAEvaluation["smpResults"][0] =
    "parameterResult";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<EPAEvaluation["smpResults"][0], "parameterId"> & {
    key: number;
  })[] = props.data.map((value, index) => {
    return {
      key: index,
      parameterBeyondLimit: value.parameterBeyondLimit,
      parameterLimit: value.parameterLimit,
      parameterName: value.parameterName,
      parameterResult: value.parameterResult,
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
      dataIndex: parameterNameDIAndKey,
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
      key: parameterNameDIAndKey,
      onFilter: (value, record) =>
        record.parameterName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.parameterName.localeCompare(b.parameterName),
      title: "Parâmetro",
    },
    {
      dataIndex: parameterLimitDIAndKey,
      key: parameterLimitDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.parameterLimit - b.parameterLimit,
      title: "Limite",
    },
    {
      dataIndex: parameterResultDIAndKey,
      key: parameterResultDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      render: (_, record) => {
        if (record.parameterBeyondLimit) {
            return <Badge color="red" count={record.parameterResult} />
        }

        return <Badge color="green" count={record.parameterResult} />
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.parameterResult - b.parameterResult,
      title: "Resultado",
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

export default SmpResultsExpand;
