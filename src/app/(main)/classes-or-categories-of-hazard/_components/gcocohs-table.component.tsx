/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ScocohsTable from "./scocohs-table.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { GcocohPropertiesEnum } from "@/enums/api/generic-classes-or-categories-of-hazard/gcocoh-properties.enum";
/* Icons import */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { Table, theme, type TableProps, Typography } from "antd";
/* Response imports */
import FindGcocohData from "@/responses/generic-classes-or-categories-of-hazard/find-gcocoh-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* GcocohsTable */
const GcocohsTable: React.FC<{
  data: GenericSuccessResponse<FindGcocohData>;
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
   * Typography.
   */
  const { Text } = Typography;
  /**
   *
   */

  /**
   * Data index e key para as colunas.
   */
  const gcocohClassifiesAsHazardDIAndKey: keyof FindGcocohData =
    "gcocohClassifiesAsHazard";

  const gcocohNameDIAndKey: keyof FindGcocohData = "gcocohName";

  const gcocohSummationDIAndKey: keyof FindGcocohData = "gcocohSummation";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Pick<
    FindGcocohData,
    | "gcocohClassifiesAsHazard"
    | "gcocohName"
    | "gcocohScocohs"
    | "gcocohSummation"
  > & { key: string })[] = props.data.data.map((value) => {
    return {
      key: value.gcocohId,
      gcocohClassifiesAsHazard: value.gcocohClassifiesAsHazard,
      gcocohName: value.gcocohName,
      gcocohScocohs: value.gcocohScocohs,
      gcocohSummation: value.gcocohSummation,
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
      dataIndex: gcocohNameDIAndKey,
      key: gcocohNameDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.gcocohName.localeCompare(b.gcocohName),
      title: GcocohPropertiesEnum.NAME,
    },
    {
      dataIndex: gcocohClassifiesAsHazardDIAndKey,
      key: gcocohClassifiesAsHazardDIAndKey,
      render: (_, { gcocohClassifiesAsHazard }) => {
        if (gcocohClassifiesAsHazard) {
          return <Text type="success">{Icons.ok}</Text>;
        }

        return <Text type="danger">{Icons.cancel}</Text>;
      },
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.gcocohClassifiesAsHazard
          .toString()
          .localeCompare(b.gcocohClassifiesAsHazard.toString()),
      title: GcocohPropertiesEnum.CLASSIFIES_AS_HAZARD,
    },
    {
      dataIndex: gcocohSummationDIAndKey,
      key: gcocohSummationDIAndKey,
      render: (_, { gcocohSummation }) => {
        if (gcocohSummation) {
          return <Text type="success">{Icons.ok}</Text>;
        }

        return <Text type="danger">{Icons.cancel}</Text>;
      },
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.gcocohSummation
          .toString()
          .localeCompare(b.gcocohSummation.toString()),
      title: GcocohPropertiesEnum.SUMMATION,
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
        expandedRowRender: ({ gcocohScocohs }) => (
          <ScocohsTable data={gcocohScocohs} />
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

export default GcocohsTable;
