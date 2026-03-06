/* Component imports */
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import GposmpsExpand from "./gposmps-expand.component";
import TposmpsExpand from "./tposmps-expand.component";
/* Other libraries imports */
import { Table, type TableProps } from "antd";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* SmpParameterTypeExpand */
const SmpParameterTypeExpand: React.FC<{
  gposmps: FindSamplingPointData["spSamples"][0]["smpGposmps"];
  tposmps: FindSamplingPointData["spSamples"][0]["smpTposmps"];
  smpId: FindSamplingPointData["spId"];
}> = (props) => {
  /**
   * Data index e key para as coluna.
   */
  const parameterTypeDIAndKey = "parameterType";
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: {
    key: string;
    parameterType: "Parâmetros genéricos" | "Parâmetros tóxicos";
  }[] = [
    {
      key: "1",
      parameterType: "Parâmetros genéricos",
    },
    {
      key: "2",
      parameterType: "Parâmetros tóxicos",
    },
  ];
  /**
   *
   */

  /**
   * Coluna da tabela.
   */
  const columns: TableProps<(typeof dataSource)[0]>["columns"] = [
    {
      dataIndex: parameterTypeDIAndKey,
      key: parameterTypeDIAndKey,
      title: "Tipo de parâmetro",
    },
  ];
  /**
   *
   */

  return (
    <Table<(typeof dataSource)[0]>
      columns={columns}
      dataSource={dataSource}
      expandable={{
        expandedRowRender: ({ parameterType }) => {
          if (parameterType === "Parâmetros genéricos") {
            return <GposmpsExpand data={props.gposmps} smpId={props.smpId} />;
          }
          if (parameterType === "Parâmetros tóxicos") {
            return <TposmpsExpand data={props.tposmps} smpId={props.smpId} />;
          }
        },
      }}
      pagination={{ ...antdPaginationOptions }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default SmpParameterTypeExpand;
