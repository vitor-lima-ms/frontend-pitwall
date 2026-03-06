/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { LaboratoryPropertiesEnum } from "@/enums/api/laboratories/lab-properties.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { Button, Table, theme, Tooltip, type TableProps } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindLaboratoryData from "@/responses/laboratories/find-lab-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* LaboratoriesTable */
const LaboratoriesTable: React.FC<{
  data: GenericSuccessResponse<FindLaboratoryData>;
  setLab: Dispatch<SetStateAction<FindLaboratoryData | undefined>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowGenerateAnalysisRequestModal: Dispatch<SetStateAction<boolean>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  showGenerateAnalysisRequestModal: boolean;
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
   * Data index e key para a coluna.
   */
  const labCompanyNameDIAndKey: keyof FindLaboratoryData = "labCompanyName";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<FindLaboratoryData, "labId"> & {
    key: string;
    labId: string;
  })[] = props.data.data.map((value) => {
    return {
      key: value.labId,
      labCep: value.labCep,
      labCnpj: value.labCnpj,
      labCompanyName: value.labCompanyName,
      labEmail: value.labEmail,
      labId: value.labId,
      labLocalityName: value.labLocalityName,
      labMainContact: value.labMainContact,
      labPhone: value.labPhone,
      labPublicPlaceComplement: value.labPublicPlaceComplement,
      labPublicPlaceName: value.labPublicPlaceName,
      labPublicPlaceNumber: value.labPublicPlaceNumber,
      labPublicPlaceType: value.labPublicPlaceType,
      labUf: value.labUf,
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
      dataIndex: labCompanyNameDIAndKey,
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
      key: labCompanyNameDIAndKey,
      onFilter: (value, record) =>
        record.labCompanyName
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      showSorterTooltip: {
        title: false,
      },
      render: (_, record) => record.labCompanyName,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.labCompanyName.localeCompare(b.labCompanyName),
      title: LaboratoryPropertiesEnum.COMPANY_NAME,
    },
    {
      ...actionsColumnOptions,
      render: (_, record) => (
        <ActionsColumn
          deleteOnClick={() => {
            props.setLab(record);
            props.setShowDeleteModal(true);
          }}
          updateOnClick={() => {
            props.setLab(record);
            props.setShowUpdateModal(true);
          }}
          otherButtons={[
            <Tooltip
              key="1"
              placement="left"
              title="Gerar solicitação de análise"
            >
              <Button
                color="default"
                icon={Icons.report}
                onClick={() => {
                  props.setShowGenerateAnalysisRequestModal(true);
                }}
                variant="link"
              />
            </Tooltip>,
          ]}
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

export default LaboratoriesTable;
