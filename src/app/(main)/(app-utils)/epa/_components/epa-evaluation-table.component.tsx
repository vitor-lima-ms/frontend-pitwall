/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import SmpResultsExpand from "./smp-results-expand.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { Table, Typography, theme, type TableProps } from "antd";
/* Response imports */
import EPAEvaluation from "@/responses/app-utils/epa-evaluation.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* EPAEvaluationTable */
const EPAEvaluationTable: React.FC<{
  data: GenericSuccessResponse<EPAEvaluation>;
}> = (props) => {
  /**
   * Typography.
   */
  const { Text } = Typography;
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
   * Data index e key para as colunas fixas.
   */
  const smpAnyParamaterBeyondLimitDIAndKey: keyof EPAEvaluation =
    "smpAnyParamaterBeyondLimit";

  const smpDescriptionDIAndKey: keyof EPAEvaluation = "smpDescription";

  const smpSamplingDateDIAndKey: keyof EPAEvaluation = "smpSamplingDate";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (EPAEvaluation & { key: number })[] = props.data.data.map(
    (value, index) => {
      return {
        key: index,
        smpAnyParamaterBeyondLimit: value.smpAnyParamaterBeyondLimit,
        smpDescription: value.smpDescription,
        smpResults: value.smpResults,
        smpSamplingDate: value.smpSamplingDate,
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
      dataIndex: smpDescriptionDIAndKey,
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
      key: smpDescriptionDIAndKey,
      onFilter: (value, record) =>
        record.smpDescription
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.smpDescription.localeCompare(b.smpDescription),
      title: "Amostra",
    },
    {
      dataIndex: smpSamplingDateDIAndKey,
      key: smpSamplingDateDIAndKey,
      render: (_, record) => {
        if (record.smpSamplingDate) {
          return new Date(record.smpSamplingDate).toLocaleDateString("pt-BR");
        }
        return "";
      },
      title: "Data de coleta",
    },
    {
      dataIndex: smpAnyParamaterBeyondLimitDIAndKey,
      key: smpAnyParamaterBeyondLimitDIAndKey,
      render: (_, { smpAnyParamaterBeyondLimit }) => {
        if (smpAnyParamaterBeyondLimit) {
          return <Text type="danger">{Icons.cancel}</Text>;
        }

        return <Text type="success">{Icons.ok}</Text>;
      },
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.smpAnyParamaterBeyondLimit
          .toString()
          .localeCompare(b.smpAnyParamaterBeyondLimit.toString()),
      title: "Conforme?",
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
        expandedRowRender: ({ smpResults }) => (
          <SmpResultsExpand data={smpResults} />
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

export default EPAEvaluationTable;
