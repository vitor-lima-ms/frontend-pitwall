/* Component imports */
import ActionsColumn from "@/app/_components/antd-table/actions-column.component";
import actionsColumnOptions from "@/app/_components/antd-table/actions-column-options";
import antdPaginationOptions from "@/app/_components/antd-table/antd-pagination-options";
import ColumnFilter from "@/app/_components/antd-table/column-filter.component";
import DateColumnFilter from "@/app/_components/antd-table/date-column-filter.component";
import GetReportModal from "../smp/get-report-modal.component";
import ShowTotal from "@/app/_components/antd-table/show-total.component";
import SmpParameterTypeExpand from "./smp-parameter-type-expand.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { SamplePropertiesEnum } from "@/enums/api/samples/smp-properties.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { Badge, Button, Table, theme, Tooltip, type TableProps } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
/* React imports */
import { useContext, useState } from "react";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* SpSamplesExpand */
const SpSamplesExpand: React.FC<{
  data: FindSamplingPointData["spSamples"];
  spId: FindSamplingPointData["spId"] | undefined;
  spName: FindSamplingPointData["spName"] | undefined;
}> = (props) => {
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
   * Data index e key para as colunas.
   */
  const finalLgrCodesDIAndKey = "finalLgrCodes";

  const lchapChapterDIAndKey = "lchapChapter";

  const smpClassificationResultDIAndKey: keyof FindSamplingPointData["spSamples"][0] =
    "smpClassificationResult";

  const smpDepthDIAndKey: keyof FindSamplingPointData["spSamples"][0] =
    "smpDepth";

  const smpDescriptionDIAndKey: keyof FindSamplingPointData["spSamples"][0] =
    "smpDescription";

  const smpSamplingDateDIAndKey: keyof FindSamplingPointData["spSamples"][0] =
    "smpSamplingDate";
  /**
   *
   */

  /**
   * Variáveis de estado
   */

  const [endDate, setEndDate] = useState<string>();

  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);

  const [startDate, setStartDate] = useState<string>();
  /**
   *
   */

  /**
   * Dados da tabela.
   */
  const dataSource: (Omit<FindSamplingPointData["spSamples"][0], "smpId"> & {
    key: string;
  })[] = props.data.map((value) => {
    return {
      key: value.smpId,
      smpClassificationDetails: value.smpClassificationDetails,
      smpClassificationResult: value.smpClassificationResult,
      smpCorrosive: value.smpCorrosive,
      smpDepth: value.smpDepth,
      smpDescription: value.smpDescription,
      smpFlammable: value.smpFlammable,
      smpGposmps: value.smpGposmps,
      smpLCode: value.smpLCode,
      smpPathogenic: value.smpPathogenic,
      smpReactive: value.smpReactive,
      smpSamplingDate: value.smpSamplingDate,
      smpReportDetails: value.smpReportDetails,
      smpTposmps: value.smpTposmps,
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
      dataIndex: lchapChapterDIAndKey,
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
      key: lchapChapterDIAndKey,
      onFilter: (value, record) =>
        `${record.smpLCode?.lcodeLChap.lchapChapter} ${record.smpLCode?.lcodeSubchapter} ${record.smpLCode?.lcodeWasteType}`
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) =>
        record.smpLCode ? (
          <Badge
            color={record.smpLCode?.lcodeHazardous ? "red" : "green"}
            count={`${record.smpLCode?.lcodeLChap.lchapChapter} ${record.smpLCode?.lcodeSubchapter} ${record.smpLCode?.lcodeWasteType}`}
          />
        ) : (
          <Badge color="blue" count="Não classificada" />
        ),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        `${a.smpLCode?.lcodeLChap.lchapChapter} ${a.smpLCode?.lcodeSubchapter} ${a.smpLCode?.lcodeWasteType}`.localeCompare(
          `${b.smpLCode?.lcodeLChap.lchapChapter} ${b.smpLCode?.lcodeSubchapter} ${b.smpLCode?.lcodeWasteType}`,
        ),
      title: SamplePropertiesEnum.LGR_CODE,
    },
    {
      dataIndex: finalLgrCodesDIAndKey,
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
      key: finalLgrCodesDIAndKey,
      onFilter: (value, record) =>
        `${record.smpLCode?.lcodeLChap.lchapChapter} ${record.smpLCode?.lcodeSubchapter} ${record.smpLCode?.lcodeWasteType}`
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      render: (_, record) =>
        record.smpClassificationResult ? (
          record.smpClassificationDetails?.step1.finalLgrCodes.map((value) => (
            <ul key={value.lcodeId}>
              <Badge
                color={value.lcodeHazardous ? "red" : "green"}
                count={`${value.lcodeLChap.lcodeLChapChapter} ${value.lcodeSubchapter} ${value.lcodeWasteType}`}
              />
            </ul>
          ))
        ) : (
          <Badge color="blue" count="Não classificada" />
        ),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        `${a.smpLCode?.lcodeLChap.lchapChapter} ${a.smpLCode?.lcodeSubchapter} ${a.smpLCode?.lcodeWasteType}`.localeCompare(
          `${b.smpLCode?.lcodeLChap.lchapChapter} ${b.smpLCode?.lcodeSubchapter} ${b.smpLCode?.lcodeWasteType}`,
        ),
      title: "Código da LGR (Final)",
    },
    {
      dataIndex: smpDescriptionDIAndKey,
      key: smpDescriptionDIAndKey,
      render: (_, record) => record.smpDescription,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.smpDescription!.localeCompare(b.smpDescription!),
      title: SamplePropertiesEnum.DESCRIPTION,
    },
    {
      dataIndex: smpDepthDIAndKey,
      key: smpDepthDIAndKey,
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.smpDepth! - b.smpDepth!,
      title: SamplePropertiesEnum.DEPTH,
    },
    {
      dataIndex: smpSamplingDateDIAndKey,
      filterDropdown: ({ close, confirm, selectedKeys, setSelectedKeys }) => {
        const handleSearch = () => confirm({ closeDropdown: false });

        return (
          <DateColumnFilter
            close={close}
            endDate={endDate}
            handleSearch={handleSearch}
            selectedKeys={selectedKeys}
            setEndDate={setEndDate}
            setSelectedKeys={setSelectedKeys}
            setStartDate={setStartDate}
            startDate={startDate}
          />
        );
      },
      key: smpSamplingDateDIAndKey,
      onFilter: (value, record) => {
        dayjs.extend(isBetween);

        return dayjs(record.smpSamplingDate).isBetween(
          dayjs(startDate?.split("/").reverse().join("-")),
          dayjs(endDate?.split("/").reverse().join("-")),
        );
      },
      render: (_, record) => {
        if (record.smpSamplingDate) {
          return new Date(record.smpSamplingDate).toLocaleString("pt-BR");
        }
        return "";
      },
      title: SamplePropertiesEnum.SAMPLING_DATE,
    },
    {
      dataIndex: smpClassificationResultDIAndKey,
      key: smpClassificationResultDIAndKey,
      render: (_, record) =>
        record.smpClassificationResult ? (
          record.smpClassificationResult === "Não perigoso" ? (
            <Badge color="green" count="Não perigoso" />
          ) : (
            <Badge color="red" count="Perigoso" />
          )
        ) : (
          <Badge color="blue" count="Não classificada" />
        ),
      showSorterTooltip: {
        title: false,
      },
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        a.smpClassificationResult!.localeCompare(b.smpClassificationResult!),
      title: SamplePropertiesEnum.CLASSIFICATION_RESULT,
    },
    {
      ...actionsColumnOptions,
      render: (
        _,
        {
          key,
          smpClassificationDetails,
          smpClassificationResult,
          smpCorrosive,
          smpDepth,
          smpDescription,
          smpFlammable,
          smpGposmps,
          smpLCode,
          smpPathogenic,
          smpReactive,
          smpReportDetails,
          smpSamplingDate,
          smpTposmps,
        },
      ) => (
        <ActionsColumn
          deleteOnClick={() => {
            context!.setSmp({
              smpClassificationDetails,
              smpClassificationResult,
              smpCorrosive,
              smpDepth,
              smpDescription,
              smpFlammable,
              smpGposmps,
              smpId: key,
              smpLCode,
              smpPathogenic,
              smpReactive,
              smpReportDetails,
              smpSamplingDate,
              smpTposmps,
            });

            context!.setSpIdAndName({
              spId: props.spId!,
              spName: props.spName!,
            });

            context!.setShowSmpDeleteModal(true);
          }}
          updateOnClick={() => {
            context!.setSmp({
              smpClassificationDetails,
              smpClassificationResult,
              smpCorrosive,
              smpDepth,
              smpDescription,
              smpFlammable,
              smpGposmps,
              smpId: key,
              smpLCode,
              smpPathogenic,
              smpReactive,
              smpReportDetails,
              smpSamplingDate,
              smpTposmps,
            });

            context!.setSpIdAndName({
              spId: props.spId!,
              spName: props.spName!,
            });

            context!.setShowSmpUpdateModal(true);
          }}
          otherButtons={[
            <Tooltip
              key="1"
              placement="left"
              title="Adicionar Parâmetro(s) genérico(s)"
            >
              <Button
                color="green"
                icon={Icons.genericParameter}
                onClick={() => {
                  context!.setSmpId({ smpId: key });

                  context!.setShowGposmpCreateModal(true);
                }}
                variant="link"
              />
            </Tooltip>,
            <Tooltip
              key="2"
              placement="left"
              title="Adicionar Parâmetro(s) tóxico(s)"
            >
              <Button
                color="green"
                icon={Icons.toxicParameter}
                onClick={() => {
                  context!.setSmpId({ smpId: key });

                  context!.setShowTposmpCreateModal(true);
                }}
                variant="link"
              />
            </Tooltip>,
            <Tooltip
              key="3"
              placement="left"
              title={smpClassificationResult ? "Reclassificar" : "Classificar"}
            >
              <Button
                color="gold"
                icon={
                  smpClassificationResult ? Icons.reclassify : Icons.classify
                }
                onClick={() => {
                  context!.setSmp({
                    smpClassificationDetails,
                    smpClassificationResult,
                    smpCorrosive,
                    smpDepth,
                    smpDescription,
                    smpFlammable,
                    smpGposmps,
                    smpId: key,
                    smpLCode,
                    smpPathogenic,
                    smpReactive,
                    smpReportDetails,
                    smpSamplingDate,
                    smpTposmps,
                  });

                  context!.setShowClassificationModal(true);
                }}
                variant="link"
              />
            </Tooltip>,
            <Tooltip key="4" placement="left" title="Gerar relatório">
              <Button
                color="default"
                disabled={!smpClassificationResult}
                icon={Icons.report}
                onClick={() => {
                  context!.setSmp({
                    smpClassificationDetails,
                    smpClassificationResult,
                    smpCorrosive,
                    smpDepth,
                    smpDescription,
                    smpFlammable,
                    smpGposmps,
                    smpId: key,
                    smpLCode,
                    smpPathogenic,
                    smpReactive,
                    smpReportDetails,
                    smpSamplingDate,
                    smpTposmps,
                  });

                  setShowGenerateReportModal(true);
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
    <>
      {showGenerateReportModal && (
        <GetReportModal
          setShowModal={setShowGenerateReportModal}
          showModal={showGenerateReportModal}
          spName={props.spName!}
        />
      )}

      <Table<(typeof dataSource)[0]>
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: ({ key, smpGposmps, smpTposmps }) => (
            <SmpParameterTypeExpand
              gposmps={smpGposmps}
              tposmps={smpTposmps}
              smpId={key}
            />
          ),
        }}
        pagination={{
          ...antdPaginationOptions,
          showTotal: (total, range) => (
            <ShowTotal fontSize={fontSizeSM} range={range} total={total} />
          ),
        }}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default SpSamplesExpand;
