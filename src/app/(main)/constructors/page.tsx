"use client";
/* API imports */
import getConstructors from "./_api/get-constructors";
/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import Icons from "@/app/_components/icons/icons";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import { Col, Row, Select, Spin, Table, theme } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table/interface";
import { useRequest, useTitle } from "ahooks";
/* React imports */
import { useState } from "react";
/* Response imports */
import FindConstructorsData from "@/responses/constructors/find-constructors-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Constructors */
type ConstructorType =
  FindConstructorsData["MRData"]["ConstructorTable"]["Constructors"][0];

const Constructors: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.CONSTRUCTOR);
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
   * Opções de ano.
   */
  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => {
    const y = (currentYear - i).toString();
    return { label: y, value: y };
  });
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [constructors, setConstructors] = useState<
    FindConstructorsData["MRData"]["ConstructorTable"]["Constructors"]
  >([]);

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [year, setYear] = useState<string>(currentYear.toString());
  /**
   *
   */

  /**
   * Buscando os dados.
   */
  const { loading, run } = useRequest((y: string) => getConstructors(y), {
    defaultParams: [currentYear.toString()],
    onSuccess: (data) => {
      if (data.success) {
        const response = data as GenericSuccessResponse<FindConstructorsData>;

        setConstructors(response.data[0].MRData.ConstructorTable.Constructors);
      } else {
        setErrorResponse(data as GenericErrorResponse);
      }
    },
  });
  /**
   *
   */

  /**
   * Função auxiliar para gerar propriedades de filtro de coluna.
   */
  const getColumnFilterProps = (
    dataIndex: keyof ConstructorType,
  ): ColumnType<ConstructorType> => ({
    filterDropdown: ({ close, confirm, selectedKeys, setSelectedKeys }) => (
      <ColumnFilter
        close={close}
        handleSearch={() => confirm()}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
      />
    ),
    filterIcon: () => Icons.search,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });
  /**
   *
   */

  /**
   * Colunas da tabela.
   */
  const columns: ColumnsType<ConstructorType> = [
    {
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      title: "Nome",
      ...getColumnFilterProps("name"),
    },
    {
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      title: "Nacionalidade",
      ...getColumnFilterProps("nationality"),
    },
  ];
  /**
   *
   */

  return (
    <Spin spinning={loading}>
      <Row align="middle" justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Select
            onChange={(value) => {
              setYear(value);

              setConstructors([]);

              run(value);
            }}
            options={yearOptions}
            placeholder="Selecione o ano"
            showSearch
            style={{ width: 150 }}
            value={year}
          />
        </Col>
      </Row>

      <Table<ConstructorType>
        columns={columns}
        dataSource={constructors}
        pagination={{
          ...antdPaginationOptions,
          showTotal: (total, range) => (
            <ShowTotal fontSize={fontSizeSM} range={range} total={total} />
          ),
        }}
        rowKey="constructorId"
      />
    </Spin>
  );
  /**
   *
   */
};

export default Constructors;
