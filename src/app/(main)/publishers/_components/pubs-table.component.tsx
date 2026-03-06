/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { PublisherPropertiesEnum } from "@/enums/api/publishers/pub-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindPublisherData from "@/responses/publishers/find-pub-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* PublishersTable */
const PublishersTable: React.FC<{
  data: GenericSuccessResponse<FindPublisherData>;
  setPub: Dispatch<SetStateAction<FindPublisherData | undefined>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
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
  const pubAcronymDIAndKey: keyof FindPublisherData = "pubAcronym";

  const pubNameDIAndKey: keyof FindPublisherData = "pubName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Pick<FindPublisherData, "pubAcronym" | "pubName"> & {
    key: string;
  })[] = props.data.data.map((value) => {
    return {
      key: value.pubId,
      pubAcronym: value.pubAcronym,
      pubName: value.pubName,
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
        record.pubAcronym
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.pubAcronym.localeCompare(b.pubAcronym),
      title: PublisherPropertiesEnum.ACRONYM,
    },
    {
      dataIndex: pubNameDIAndKey,
      filterDropdown: ({ close, confirm, selectedKeys, setSelectedKeys }) => {
        const handleSearch = () => confirm({ closeDropdown: true });

        return (
          <ColumnFilter
            close={close}
            handleSearch={handleSearch}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
          />
        );
      },
      key: pubNameDIAndKey,
      onFilter: (value, record) =>
        record.pubName.toLowerCase().includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.pubName.localeCompare(b.pubName),
      title: PublisherPropertiesEnum.NAME,
    },
    {
      ...actionsColumnOptions,
      render: (_, { pubAcronym, pubName, key }) => (
        <ActionsColumn
          deleteOnClick={() => {
            props.setPub({
              pubAcronym,
              pubId: key,
              pubName,
            });

            props.setShowDeleteModal(true);
          }}
          updateOnClick={() => {
            props.setPub({
              pubAcronym,
              pubId: key,
              pubName,
            });

            props.setShowUpdateModal(true);
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

export default PublishersTable;
