/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { RegulationPropertiesEnum } from "@/enums/api/regulations/reg-properties.enum";
/* Other libraries imports */
import { Table, theme, type TableProps } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* RegulationsTable */
const RegulationsTable: React.FC<{
  data: GenericSuccessResponse<FindRegulationData>;
  setReg: Dispatch<SetStateAction<FindRegulationData | undefined>>;
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
  const pubAcronymDIAndKey: keyof FindRegulationData["regPub"] = "pubAcronym";

  const regIdentifierDIAndKey: keyof FindRegulationData = "regIdentifier";

  const regPublicationDateDIAndKey: keyof FindRegulationData = "regPublicationDate";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<FindRegulationData, "regId"> & { key: string })[] =
    props.data.data.map((value) => {
      return {
        key: value.regId,
        regIdentifier: value.regIdentifier,
        regPub: value.regPub,
        regPublicationDate: value.regPublicationDate,
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
        record.regPub.pubAcronym
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.regPub.pubAcronym,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.regPub.pubAcronym.localeCompare(b.regPub.pubAcronym),
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
        record.regIdentifier
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.regIdentifier.localeCompare(b.regIdentifier),
      title: RegulationPropertiesEnum.IDENTIFIER,
    },
    {
      dataIndex: regPublicationDateDIAndKey,
      key: regPublicationDateDIAndKey,
      render: (_, record) =>
        new Date(record.regPublicationDate).toLocaleDateString("pt-BR"),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.regPublicationDate.localeCompare(b.regPublicationDate),
      title: RegulationPropertiesEnum.PUBLICATION_DATE,
    },
    {
      ...actionsColumnOptions,
      render: (_, { regPub, regIdentifier, regPublicationDate, key }) => (
        <ActionsColumn
          deleteOnClick={() => {
            props.setReg({
              regPub,
              regId: key,
              regIdentifier,
              regPublicationDate,
            });

            props.setShowDeleteModal(true);
          }}
          updateOnClick={() => {
            props.setReg({
              regPub,
              regId: key,
              regIdentifier,
              regPublicationDate,
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

export default RegulationsTable;
