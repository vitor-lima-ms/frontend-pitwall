/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import GpContext from "../../../../_context/gp-context";
/* Enum imports */
import { QsfgpPropertiesEnum } from "@/enums/api/quality-standards-for-generic-parameters/qsfgp-properties.enum";
import { RegulationPropertiesEnum } from "@/enums/api/regulations/reg-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
/* GpQsfgpsExpand */
const GpQsfgpsExpand: React.FC<{
  data: FindGenericParameterData["gpQsfgps"];
  gpId: FindGenericParameterData["gpId"] | undefined;
  gpName: FindGenericParameterData["gpName"] | undefined;
}> = (props) => {
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
   * Data index e key para as colunas.
   */
  const emNameDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0]["qsfgpEm"] =
    "emName";

  const pubAcronymDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0]["qsfgpReg"]["regPub"] =
    "pubAcronym";

  const qsfgpEmParticularityDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0] =
    "qsfgpEmParticularity";

  const qsfgpMaxValueDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0] =
    "qsfgpMaxValue";

  const qsfgpMinValueDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0] =
    "qsfgpMinValue";

  const regIdentifierDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0]["qsfgpReg"] =
    "regIdentifier";

  const unNameDIAndKey: keyof FindGenericParameterData["gpQsfgps"][0]["qsfgpUn"] =
    "unName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<
    FindGenericParameterData["gpQsfgps"][0],
    "qsfgpId"
  > & { key: string })[] = props.data.map((value) => {
    return {
      key: value.qsfgpId,
      qsfgpEm: value.qsfgpEm,
      qsfgpEmParticularity: value.qsfgpEmParticularity,
      qsfgpMaxValue: value.qsfgpMaxValue,
      qsfgpMinValue: value.qsfgpMinValue,
      qsfgpReg: value.qsfgpReg,
      qsfgpUn: value.qsfgpUn,
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
      dataIndex: pubAcronymDIAndKey,
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
      key: pubAcronymDIAndKey,
      onFilter: (value, record) =>
        record.qsfgpReg.regPub.pubAcronym
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.qsfgpReg.regPub.pubAcronym,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.qsfgpReg.regPub.pubAcronym.localeCompare(
          b.qsfgpReg.regPub.pubAcronym
        ),
      title: RegulationPropertiesEnum.PUBLISHER,
    },
    {
      dataIndex: regIdentifierDIAndKey,
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
      key: regIdentifierDIAndKey,
      onFilter: (value, record) =>
        record.qsfgpReg.regIdentifier
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.qsfgpReg.regIdentifier,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.qsfgpReg.regIdentifier.localeCompare(b.qsfgpReg.regIdentifier),
      title: QsfgpPropertiesEnum.REGULATION,
    },
    {
      dataIndex: emNameDIAndKey,
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
      key: emNameDIAndKey,
      onFilter: (value, record) =>
        record.qsfgpEm.emName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.qsfgpEm.emName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.qsfgpEm.emName.localeCompare(b.qsfgpEm.emName),
      title: QsfgpPropertiesEnum.ENVIRONMENTAL_MATRIX,
    },
    {
      dataIndex: qsfgpEmParticularityDIAndKey,
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
      key: qsfgpEmParticularityDIAndKey,
      onFilter: (value, record) =>
        record
          .qsfgpEmParticularity!.toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.qsfgpEmParticularity,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.qsfgpEmParticularity!.localeCompare(b.qsfgpEmParticularity!),
      title: QsfgpPropertiesEnum.ENVIRONMENTAL_MATRIX_PARTICULARITY,
    },
    {
      dataIndex: qsfgpMaxValueDIAndKey,
      key: qsfgpMaxValueDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.qsfgpMaxValue! - b.qsfgpMaxValue!,
      title: QsfgpPropertiesEnum.MAX_VALUE,
    },
    {
      dataIndex: qsfgpMinValueDIAndKey,
      key: qsfgpMinValueDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.qsfgpMinValue! - b.qsfgpMinValue!,
      title: QsfgpPropertiesEnum.MIN_VALUE,
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
        record.qsfgpUn.unName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.qsfgpUn.unName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.qsfgpUn.unName.localeCompare(b.qsfgpUn.unName),
      title: QsfgpPropertiesEnum.UNIT,
    },
    {
      ...actionsColumnOptions,
      render: (
        _,
        {
          qsfgpEm,
          key,
          qsfgpReg,
          qsfgpEmParticularity,
          qsfgpMaxValue,
          qsfgpMinValue,
          qsfgpUn,
        }
      ) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setGp({
              gpId: props.gpId!,
              gpName: props.gpName!,
            });

            context!.setQsfgp({
              qsfgpEm,
              qsfgpEmParticularity,
              qsfgpId: key,
              qsfgpMaxValue,
              qsfgpMinValue,
              qsfgpReg,
              qsfgpUn,
            });

            context!.setShowQsfgpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setGp({
              gpId: props.gpId!,
              gpName: props.gpName!,
            });

            context!.setQsfgp({
              qsfgpEm,
              qsfgpEmParticularity,
              qsfgpId: key,
              qsfgpMaxValue,
              qsfgpMinValue,
              qsfgpReg,
              qsfgpUn,
            });

            context!.setShowQsfgpUpdateModal(true);
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

export default GpQsfgpsExpand;
