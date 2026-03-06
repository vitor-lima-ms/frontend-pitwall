/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Context imports */
import SpContext from "@/app/(main)/sampling-points/_context/sp-context";
/* Enum imports */
import { SamplingPointPropertiesEnum } from "@/enums/api/sampling-points/sp-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { useContext } from "react";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* SpsTable */
const SpsTable: React.FC = () => {
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
   * Data index e key para a colunas.
   */
  const emNameDIAndKey: keyof FindSamplingPointData["spEm"] = "emName";

  const spCoordXDIAndKey: keyof FindSamplingPointData = "spCoordX";

  const spCoordYDIAndKey: keyof FindSamplingPointData = "spCoordY";

  const spCoordZDIAndKey: keyof FindSamplingPointData = "spCoordZ";

  const spDescriptionDIAndKey: keyof FindSamplingPointData = "spDescription";

  const spNameDIAndKey: keyof FindSamplingPointData = "spName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<FindSamplingPointData, "spId"> & { key: string })[] =
    context!.tablesData.data.map((value) => {
      return {
        key: value.spId,
        spCoordX: value.spCoordX,
        spCoordY: value.spCoordY,
        spCoordZ: value.spCoordZ,
        spDescription: value.spDescription,
        spEm: value.spEm,
        spName: value.spName,
        spSamples: value.spSamples,
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
      dataIndex: spNameDIAndKey,
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
      key: spNameDIAndKey,
      onFilter: (value, record) =>
        record.spName!.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.spName!.localeCompare(b.spName!),
      title: SamplingPointPropertiesEnum.NAME,
    },
    {
      dataIndex: spDescriptionDIAndKey,
      key: spDescriptionDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.spDescription!.localeCompare(b.spDescription!),
      title: SamplingPointPropertiesEnum.DESCRIPTION,
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
        record.spEm.emName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.spEm.emName,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.spEm.emName.localeCompare(b.spEm.emName),
      title: SamplingPointPropertiesEnum.ENVIRONMENTAL_MATRIX,
    },
    {
      dataIndex: spCoordXDIAndKey,
      key: spCoordXDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.spCoordX - b.spCoordX,
      title: SamplingPointPropertiesEnum.COORD_X,
    },
    {
      dataIndex: spCoordYDIAndKey,
      key: spCoordYDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.spCoordY - b.spCoordY,
      title: SamplingPointPropertiesEnum.COORD_Y,
    },
    {
      dataIndex: spCoordZDIAndKey,
      key: spCoordZDIAndKey,
      title: SamplingPointPropertiesEnum.COORD_Z,
    },
    {
      ...actionsColumnOptions,
      render: (
        _,
        {
          key,
          spEm,
          spCoordX,
          spCoordY,
          spCoordZ,
          spDescription,
          spName,
          spSamples,
        }
      ) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setSp({
              spEm,
              spCoordX,
              spCoordY,
              spCoordZ,
              spDescription,
              spId: key,
              spName,
              spSamples,
            });

            context!.setShowSpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setSp({
              spEm,
              spCoordX,
              spCoordY,
              spCoordZ,
              spDescription,
              spId: key,
              spName,
              spSamples,
            });

            context!.setShowSpUpdateModal(true);
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

export default SpsTable;
