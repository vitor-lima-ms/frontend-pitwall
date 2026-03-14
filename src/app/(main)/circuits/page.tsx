"use client";
/* API imports */
import getCircuits from "./_api/get-circuits";
/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import Icons from "@/app/_components/icons/icons";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
/* Enum imports */
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Flex, Select, Spin, Table, theme, Typography } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table/interface";
import { useRequest, useTitle } from "ahooks";
/* React imports */
import { useState } from "react";
/* Response imports */
import FindCircuitsData from "@/responses/circuits/find-circuits-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* Circuits */
type CircuitType =
  FindCircuitsData["MRData"]["CircuitTable"]["Circuits"][0];

const Circuits: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.CIRCUIT);
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
   * Typography.
   */
  const { Text } = Typography;
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [circuits, setCircuits] = useState<
    FindCircuitsData["MRData"]["CircuitTable"]["Circuits"]
  >([]);

  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [selectedCircuits, setSelectedCircuits] = useState<CircuitType[]>([]);
  /**
   *
   */

  /**
   * Buscando os dados.
   */
  const { loading } = useRequest(() => getCircuits(), {
    onSuccess: (data) => {
      if (data.success) {
        const response = data as GenericSuccessResponse<FindCircuitsData>;

        setCircuits(response.data[0].MRData.CircuitTable.Circuits);
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
    dataIndex: keyof CircuitType,
  ): ColumnType<CircuitType> => ({
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
  const columns: ColumnsType<CircuitType> = [
    {
      dataIndex: "circuitName",
      sorter: (a, b) => a.circuitName.localeCompare(b.circuitName),
      title: "Circuito",
      ...getColumnFilterProps("circuitName"),
    },
    {
      dataIndex: ["Location", "locality"],
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
        record.Location.locality
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.Location.locality,
      sorter: (a, b) =>
        a.Location.locality.localeCompare(b.Location.locality),
      title: "Cidade",
    },
    {
      dataIndex: ["Location", "country"],
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
        record.Location.country
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) => record.Location.country,
      sorter: (a, b) =>
        a.Location.country.localeCompare(b.Location.country),
      title: "País",
    },
  ];
  /**
   *
   */

  return (
    <Spin spinning={loading}>
      <Table<CircuitType>
        columns={columns}
        dataSource={circuits}
        pagination={{
          ...antdPaginationOptions,
          showTotal: (total, range) => (
            <ShowTotal fontSize={fontSizeSM} range={range} total={total} />
          ),
        }}
        rowKey="circuitId"
      />

      <Flex vertical gap="middle" style={{ marginTop: 16, width: "100%" }}>
        <Select
          allowClear
          loading={loading}
          mode="multiple"
          onChange={(value) => {
            const selectedIds = value as string[];

            const selected: CircuitType[] = [];

            selectedIds.forEach((id) => {
              circuits.forEach((circuit) => {
                if (id === circuit.circuitId) {
                  selected.push(circuit);
                }
              });
            });

            setSelectedCircuits(selected);
          }}
          options={circuits.map((circuit) => {
            return {
              label: circuit.circuitName,
              value: circuit.circuitId,
            };
          })}
          placeholder={`Selecione os ${PluralPagesNamesEnum.CIRCUIT.toLowerCase()}`}
          showSearch={{ optionFilterProp: "label" }}
          style={{ width: "100%" }}
        />

        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <Map
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={2}
            mapId="DEMO_MAP_ID"
            style={{ height: "calc(100vh - 150px)", width: "100%" }}
          >
            {selectedCircuits.map((circuit) => (
              <AdvancedMarker
                key={circuit.circuitId}
                position={{
                  lat: Number(circuit.Location.lat),
                  lng: Number(circuit.Location.long),
                }}
              >
                <Pin>
                  <div
                    style={{
                      backgroundColor: "black",
                      borderRadius: "2.5px",
                      fontSize: "12px",
                      padding: "2px",
                      transform: "translateY(-30px)",
                      width: "max-content",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {circuit.circuitName}
                    </Text>
                  </div>
                </Pin>
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </Flex>
    </Spin>
  );
  /**
   *
   */
};

export default Circuits;
