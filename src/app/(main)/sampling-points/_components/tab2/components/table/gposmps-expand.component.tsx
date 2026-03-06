/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { GposmpPropertiesEnum } from "@/enums/api/generic-parameters-of-samples/gposmp-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* GposmpsExpand */
const GposmpsExpand: React.FC<{
  data: FindSamplingPointData["spSamples"][0]["smpGposmps"];
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
  const gpNameDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpGposmps"][0]["gposmpGp"] =
    "gpName";

  const gposmpCompiledValueDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpGposmps"][0] =
    "gposmpCompiledValue";

  const gposmpOriginalValueDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpGposmps"][0] =
    "gposmpOriginalValue";

  const unNameDIAndKey: keyof FindSamplingPointData["spSamples"][0]["smpGposmps"][0]["gposmpUn"] =
    "unName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<
    FindSamplingPointData["spSamples"][0]["smpGposmps"][0],
    "gposmpId"
  > & {
    key: string;
  })[] = props.data.map((value) => {
    return {
      gposmpCompiledValue: value.gposmpCompiledValue,
      gposmpGp: value.gposmpGp,
      gposmpOriginalValue: value.gposmpOriginalValue,
      gposmpUn: value.gposmpUn,
      key: value.gposmpId,
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
        record.gposmpGp.gpName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.gposmpGp.gpName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.gposmpGp.gpName.localeCompare(b.gposmpGp.gpName),
      title: GposmpPropertiesEnum.GENERIC_PARAMETER,
    },
    {
      dataIndex: gposmpCompiledValueDIAndKey,
      key: gposmpCompiledValueDIAndKey,
      render: (_, record) => record.gposmpOriginalValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.gposmpOriginalValue.localeCompare(b.gposmpOriginalValue),
      title: GposmpPropertiesEnum.ORIGINAL_VALUE,
    },
    {
      dataIndex: gposmpOriginalValueDIAndKey,
      key: gposmpOriginalValueDIAndKey,
      render: (_, record) => record.gposmpCompiledValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.gposmpCompiledValue - b.gposmpCompiledValue!,
      title: GposmpPropertiesEnum.COMPILED_VALUE,
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
        record.gposmpUn.unName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.gposmpUn.unName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.gposmpUn.unName.localeCompare(b.gposmpUn.unName),
      title: GposmpPropertiesEnum.UNIT,
    },
    {
      ...actionsColumnOptions,
      render: (
        _,
        { key, gposmpCompiledValue, gposmpGp, gposmpOriginalValue, gposmpUn }
      ) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setGposmp({
              gposmpCompiledValue,
              gposmpGp,
              gposmpId: key,
              gposmpOriginalValue,
              gposmpUn,
            });

            context!.setSmpId({ smpId: props.smpId! });

            context!.setShowGposmpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setGposmp({
              gposmpCompiledValue,
              gposmpGp,
              gposmpId: key,
              gposmpOriginalValue,
              gposmpUn,
            });

            context!.setSmpId({ smpId: props.smpId! });

            context!.setShowGposmpUpdateModal(true);
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

export default GposmpsExpand;
