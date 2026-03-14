"use client";
/* API imports */
import getDrivers from "./_api/get-drivers";
/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import DateColumnFilter from "@/app/_components/antd-table/date-column-filter.component";
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
import FindDriversData from "@/responses/drivers/find-drivers-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Drivers */
type DriverType = FindDriversData["MRData"]["DriverTable"]["Drivers"][0];

const Drivers: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.DRIVER);
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
  const [drivers, setDrivers] = useState<
    FindDriversData["MRData"]["DriverTable"]["Drivers"]
  >([]);

  const [endDate, setEndDate] = useState<string | undefined>();

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [startDate, setStartDate] = useState<string | undefined>();

  const [year, setYear] = useState<string>(currentYear.toString());
  /**
   *
   */

  /**
   * Buscando os dados.
   */
  const { loading, run } = useRequest((y: string) => getDrivers(y), {
    defaultParams: [currentYear.toString()],
    onSuccess: (data) => {
      if (data.success) {
        const response = data as GenericSuccessResponse<FindDriversData>;

        setDrivers(response.data[0].MRData.DriverTable.Drivers);
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
    dataIndex: keyof DriverType,
  ): ColumnType<DriverType> => ({
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
      (record[dataIndex] ?? "")
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
  const columns: ColumnsType<DriverType> = [
    {
      dataIndex: "code",
      sorter: (a, b) => (a.code ?? "").localeCompare(b.code ?? ""),
      title: "Código",
      ...getColumnFilterProps("code"),
    },
    {
      dataIndex: "givenName",
      render: (_, record) => `${record.givenName} ${record.familyName}`,
      sorter: (a, b) =>
        `${a.givenName} ${a.familyName}`.localeCompare(
          `${b.givenName} ${b.familyName}`,
        ),
      title: "Nome",
      ...getColumnFilterProps("givenName"),
    },
    {
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      title: "Nacionalidade",
      ...getColumnFilterProps("nationality"),
    },
    {
      dataIndex: "permanentNumber",
      sorter: (a, b) => Number(a.permanentNumber) - Number(b.permanentNumber),
      title: "Número",
    },
    {
      dataIndex: "dateOfBirth",
      filterDropdown: ({ close, confirm, selectedKeys, setSelectedKeys }) => (
        <DateColumnFilter
          close={close}
          endDate={endDate}
          handleSearch={() => confirm()}
          selectedKeys={selectedKeys}
          setEndDate={setEndDate}
          setSelectedKeys={setSelectedKeys}
          setStartDate={setStartDate}
          startDate={startDate}
        />
      ),
      filterIcon: () => Icons.search,
      onFilter: (_, record) => {
        if (!startDate || !endDate) return true;

        const date = new Date(record.dateOfBirth);

        const start = new Date(startDate.split("/").reverse().join("-"));

        const end = new Date(endDate.split("/").reverse().join("-"));

        return date >= start && date <= end;
      },
      title: "Data de nascimento",
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

              setDrivers([]);

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

      <Table<DriverType>
        columns={columns}
        dataSource={drivers}
        pagination={{
          ...antdPaginationOptions,
          showTotal: (total, range) => (
            <ShowTotal fontSize={fontSizeSM} range={range} total={total} />
          ),
        }}
        rowKey="driverId"
      />
    </Spin>
  );
  /**
   *
   */
};

export default Drivers;
