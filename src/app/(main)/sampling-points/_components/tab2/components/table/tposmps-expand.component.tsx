/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { TposmpPropertiesEnum } from "@/enums/api/toxic-parameters-of-samples/tposmp-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* TposmpsExpand */
const TposmpsExpand: React.FC<{
  data: FindSamplingPointData["spSamples"][0]["smpTposmps"];
  smpId: FindSamplingPointData["spId"] | undefined;
}> = (props) => {
  /**
   * Context.
   */
  const context = useContext(SpContext);
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
   * Data index e key para as colunas.
   */
  const tpNameDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpTposmps"][0]["tposmpTp"] =
    "tpName";

  const tposmpCompiledValueDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpTposmps"][0] =
    "tposmpCompiledValue";

  const tposmpOriginalValueDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpTposmps"][0] =
    "tposmpOriginalValue";

  const unNameDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpTposmps"][0]["tposmpUn"] =
    "unName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<
    FindSamplingPointData["spSamples"][0]["smpTposmps"][0],
    "tposmpId"
  > & {
    key: string;
  })[] = props.data.map((value) => {
    return {
      tposmpCompiledValue: value.tposmpCompiledValue,
      tposmpTp: value.tposmpTp,
      tposmpOriginalValue: value.tposmpOriginalValue,
      tposmpUn: value.tposmpUn,
      key: value.tposmpId,
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
        record.tposmpTp.tpName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.tposmpTp.tpName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.tposmpTp.tpName.localeCompare(b.tposmpTp.tpName),
      title: TposmpPropertiesEnum.TOXIC_PARAMETER,
    },
    {
      dataIndex: tposmpCompiledValueDIAndKey,
      key: tposmpCompiledValueDIAndKey,
      render: (_, record) => record.tposmpOriginalValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.tposmpOriginalValue.localeCompare(b.tposmpOriginalValue),
      title: TposmpPropertiesEnum.ORIGINAL_VALUE,
    },
    {
      dataIndex: tposmpOriginalValueDIAndKey,
      key: tposmpOriginalValueDIAndKey,
      render: (_, record) => record.tposmpCompiledValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.tposmpCompiledValue! - b.tposmpCompiledValue!,
      title: TposmpPropertiesEnum.COMPILED_VALUE,
    },
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
        record.tposmpUn.unName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.tposmpUn.unName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.tposmpUn.unName.localeCompare(b.tposmpUn.unName),
      title: TposmpPropertiesEnum.UNIT,
    },
    {
      ...actionsColumnOptions,
      render: (_, record) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setTposmp({
              tposmpId: record.key,
              tposmpCompiledValue: record.tposmpCompiledValue,
              tposmpOriginalValue: record.tposmpOriginalValue,
              tposmpTp: record.tposmpTp,
              tposmpUn: record.tposmpUn,
            });

            context!.setSmpId({ smpId: props.smpId! });

            context!.setShowTposmpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setTposmp({
              tposmpId: record.key,
              tposmpCompiledValue: record.tposmpCompiledValue,
              tposmpOriginalValue: record.tposmpOriginalValue,
              tposmpTp: record.tposmpTp,
              tposmpUn: record.tposmpUn,
            });

            context!.setSmpId({ smpId: props.smpId! });

            context!.setShowTposmpUpdateModal(true);
          }}
        />
      ),
    },
  ];
  /**
   *
   */

  return (
    <Table
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

export default TposmpsExpand;
