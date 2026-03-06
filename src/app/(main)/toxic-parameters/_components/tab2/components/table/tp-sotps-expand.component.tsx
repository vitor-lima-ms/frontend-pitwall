/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import TpContext from "@/app/(main)/toxic-parameters/_context/tp-context";
/* Enum imports */
import { ScocohPropertiesEnum } from "@/enums/api/specific-classes-or-categories-of-hazard/scocoh-properties.enum";
import { SotpPropertiesEnum } from "@/enums/api/scocoh-of-toxic-parameters/sotp-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
/* TpSotpExpand */
const TpSotpExpand: React.FC<{
  data: FindToxicParameterData["tpSotps"];
  tpId: FindToxicParameterData["tpId"] | undefined;
  tpName: FindToxicParameterData["tpName"] | undefined;
}> = (props) => {
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
   * Data index e key para as colunas.
   */
  const scocohAbbreviationDIAndKey: keyof FindToxicParameterData["tpSotps"][0]["sotpScocoh"] =
    "scocohAbbreviation";

  const hcodeCodeDIAndKey: keyof FindToxicParameterData["tpSotps"][0]["sotpScocoh"]["scocohHCode"] =
    "hcodeCode";

  const scocohGenericMaxValueDIAndKey: keyof FindToxicParameterData["tpSotps"][0]["sotpScocoh"] =
    "scocohGenericMaxValue";

  const scocohGenericMinValueDIAndKey: keyof FindToxicParameterData["tpSotps"][0]["sotpScocoh"] =
    "scocohGenericMinValue";

  const scocohUnNameDIAndKey = "scocohUnName";

  const sotpMfactorDIAndKey: keyof FindToxicParameterData["tpSotps"][0] =
    "sotpMfactor";

  const sotpSpecificMaxValueDIAndKey: keyof FindToxicParameterData["tpSotps"][0] =
    "sotpSpecificMaxValue";

  const sotpSpecificMinValueDIAndKey: keyof FindToxicParameterData["tpSotps"][0] =
    "sotpSpecificMinValue";

  const sotpUnNameDIAndKey = "sotpUnName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<FindToxicParameterData["tpSotps"][0], "sotpId"> & {
    key: string;
  })[] = props.data.map((value) => {
    return {
      key: value.sotpId,
      sotpMfactor: value.sotpMfactor,
      sotpScocoh: value.sotpScocoh,
      sotpSpecificMaxValue: value.sotpSpecificMaxValue,
      sotpSpecificMinValue: value.sotpSpecificMinValue,
      sotpUn: value.sotpUn,
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
      dataIndex: scocohAbbreviationDIAndKey,
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
      key: scocohAbbreviationDIAndKey,
      onFilter: (value, record) =>
        record.sotpScocoh.scocohAbbreviation
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.sotpScocoh.scocohAbbreviation,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.sotpScocoh.scocohAbbreviation.localeCompare(
          b.sotpScocoh.scocohAbbreviation
        ),
      title: ScocohPropertiesEnum.ABBREVIATION,
    },
    {
      dataIndex: hcodeCodeDIAndKey,
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
      key: hcodeCodeDIAndKey,
      onFilter: (value, record) =>
        record.sotpScocoh.scocohHCode.hcodeCode
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.sotpScocoh.scocohHCode.hcodeCode,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.sotpScocoh.scocohHCode.hcodeCode.localeCompare(
          b.sotpScocoh.scocohHCode.hcodeCode
        ),
      title: ScocohPropertiesEnum.H_CODE,
    },
    {
      dataIndex: scocohGenericMaxValueDIAndKey,
      key: scocohGenericMaxValueDIAndKey,
      render: (_, record) => record.sotpScocoh.scocohGenericMaxValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.sotpScocoh.scocohGenericMaxValue! -
        b.sotpScocoh.scocohGenericMaxValue!,
      title: ScocohPropertiesEnum.GENERIC_MAX_VALUE,
    },
    {
      dataIndex: scocohGenericMinValueDIAndKey,
      key: scocohGenericMinValueDIAndKey,
      render: (_, record) => record.sotpScocoh.scocohGenericMinValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.sotpScocoh.scocohGenericMinValue! -
        b.sotpScocoh.scocohGenericMinValue!,
      title: ScocohPropertiesEnum.GENERIC_MIN_VALUE,
    },
    {
      dataIndex: scocohUnNameDIAndKey,
      key: scocohUnNameDIAndKey,
      render: (_, record) => record.sotpScocoh.scocohUn.unName,
      title: ScocohPropertiesEnum.UNIT + " " + "(Genérico)",
    },
    {
      dataIndex: sotpMfactorDIAndKey,
      key: sotpMfactorDIAndKey,
      render: (_, record) => record.sotpMfactor,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.sotpMfactor! - b.sotpMfactor!,
      title: SotpPropertiesEnum.M_FACTOR,
    },
    {
      dataIndex: sotpSpecificMaxValueDIAndKey,
      key: sotpSpecificMaxValueDIAndKey,
      render: (_, record) => record.sotpSpecificMaxValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.sotpSpecificMaxValue! - b.sotpSpecificMinValue!,
      title: SotpPropertiesEnum.SPECIFIC_MAX_VALUE,
    },
    {
      dataIndex: sotpSpecificMinValueDIAndKey,
      key: scocohGenericMinValueDIAndKey,
      render: (_, record) => record.sotpSpecificMinValue,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.sotpSpecificMinValue! - b.sotpSpecificMinValue!,
      title: SotpPropertiesEnum.SPECIFIC_MIN_VALUE,
    },
    {
      dataIndex: sotpUnNameDIAndKey,
      key: sotpUnNameDIAndKey,
      render: (_, record) => record.sotpUn?.unName,
      title: ScocohPropertiesEnum.UNIT + " " + "(Específico)",
    },
    {
      ...actionsColumnOptions,
      render: (
        _,
        {
          key,
          sotpMfactor,
          sotpScocoh,
          sotpSpecificMaxValue,
          sotpSpecificMinValue,
          sotpUn,
        }
      ) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setTpIdAndName({
              tpId: props.tpId!,
              tpName: props.tpName!,
            });

            context!.setSotp({
              sotpId: key,
              sotpMfactor,
              sotpScocoh,
              sotpSpecificMaxValue,
              sotpSpecificMinValue,
              sotpUn,
            });

            context!.setShowSotpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setTpIdAndName({
              tpId: props.tpId!,
              tpName: props.tpName!,
            });

            context!.setSotp({
              sotpId: key,
              sotpMfactor,
              sotpScocoh,
              sotpSpecificMaxValue,
              sotpSpecificMinValue,
              sotpUn,
            });

            context!.setShowSotpUpdateModal(true);
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

export default TpSotpExpand;
