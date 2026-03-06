/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { ScocohPropertiesEnum } from "@/enums/api/specific-classes-or-categories-of-hazard/scocoh-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* Response imports */
import FindGcocohData from "@/responses/generic-classes-or-categories-of-hazard/find-gcocoh-data.response";
/* ScocohsTable */
const ScocohsTable: React.FC<{ data: FindGcocohData["gcocohScocohs"] }> = (
  props
) => {
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
  const hcodeCodeDIAndKey: keyof FindGcocohData["gcocohScocohs"][0]["scocohHCode"] =
    "hcodeCode";

  const scocohAbbreviationDIAndKey: keyof FindGcocohData["gcocohScocohs"][0] =
    "scocohAbbreviation";

  const scocohDescriptionDIAndKey: keyof FindGcocohData["gcocohScocohs"][0] =
    "scocohDescription";

  const scocohGenericMaxValueDIAndKey: keyof FindGcocohData["gcocohScocohs"][0] =
    "scocohGenericMaxValue";

  const scocohGenericMinValueDIAndKey: keyof FindGcocohData["gcocohScocohs"][0] =
    "scocohGenericMinValue";

  const unNameDIAndKey: keyof FindGcocohData["gcocohScocohs"][0]["scocohUn"] =
    "unName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<
    FindGcocohData["gcocohScocohs"][0],
    "scocohId" | "hcodeId" | "unId"
  > & {
    key: string;
  })[] = props.data.map((value) => {
    return {
      key: value.scocohId,
      scocohAbbreviation: value.scocohAbbreviation,
      scocohDescription: value.scocohDescription,
      scocohGenericMaxValue: value.scocohGenericMaxValue,
      scocohGenericMinValue: value.scocohGenericMinValue,
      scocohHCode: value.scocohHCode,
      scocohUn: value.scocohUn,
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
      dataIndex: hcodeCodeDIAndKey,
      key: hcodeCodeDIAndKey,
      render: (_, record) => record.scocohHCode.hcodeCode,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.scocohHCode.hcodeCode.localeCompare(b.scocohHCode.hcodeCode),
      showSorterTooltip: {
        title: false,
      },
      title: ScocohPropertiesEnum.H_CODE,
    },
    {
      dataIndex: scocohAbbreviationDIAndKey,
      key: scocohAbbreviationDIAndKey,
      title: ScocohPropertiesEnum.ABBREVIATION,
    },
    {
      dataIndex: scocohDescriptionDIAndKey,
      key: scocohDescriptionDIAndKey,
      title: ScocohPropertiesEnum.DESCRIPTION,
    },
    {
      dataIndex: scocohGenericMaxValueDIAndKey,
      key: scocohGenericMaxValueDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.scocohGenericMaxValue! - b.scocohGenericMaxValue!,
      title: ScocohPropertiesEnum.GENERIC_MAX_VALUE,
    },
    {
      dataIndex: scocohGenericMinValueDIAndKey,
      key: scocohGenericMinValueDIAndKey,
      title: ScocohPropertiesEnum.GENERIC_MIN_VALUE,
    },
    {
      dataIndex: unNameDIAndKey,
      key: unNameDIAndKey,
      render: (_, record) => record.scocohUn.unName,
      title: ScocohPropertiesEnum.UNIT,
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

export default ScocohsTable;
