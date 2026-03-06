/* API imports */
import deleteFile from "@/app/(main)/sampling-points/_api/imp/delete-file";
import getGenericParameters from "@/app/(main)/generic-parameters/_api/gp/get-gps";
import getSamplingPoints from "@/app/(main)/sampling-points/_api/sp/get-sps";
import getToxicParameters from "@/app/(main)/toxic-parameters/_api/tp/get-tps";
import getUnits from "@/app/(main)/units/_api/get-uns";
import horizontalImport from "@/app/(main)/sampling-points/_api/smp/horizontal-import";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { App, Card, Form, Input, Modal, Select, Spin, theme } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import HorizontalImport from "@/requests/samples/horizontal-import.request";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* HorizontalImportMappingModal */
const HorizontalImportMappingModal: React.FC = () => {
  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

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
    token: { marginXS },
  } = theme.useToken();
  /**
   *
   */

  /**
   * useForm.
   */
  const [form] = Form.useForm();
  /**
   *
   */

  /**
   * Nomes para os campos de formulário.
   */
  const filePath: keyof HorizontalImport = "filePath";

  const parameters: keyof HorizontalImport = "parameters";

  const samplingPoints: keyof HorizontalImport = "samplingPoints";

  const unIdForPOPs: keyof HorizontalImport = "unIdForPOPs";

  const unIdForTps: keyof HorizontalImport = "unIdForTps";
  /**
   *
   */

  /**
   * Antd App Wrapper.
   */
  const { message } = App.useApp();
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [allParameters, setAllParameters] = useState<
    { label: string; value: string }[]
  >([]);

  const [sps, setSps] = useState<FindSamplingPointData[]>([]);

  const [uns, setUns] = useState<FindUnitData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Parâmetros genéricos.
   */
  const getGpsLoading = useRequest(
    () => getGenericParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const gps: GenericSuccessResponse<FindGenericParameterData> =
            data as GenericSuccessResponse<FindGenericParameterData>;

          const gpsForAllParameters: typeof allParameters = gps.data.map(
            (value) => ({
              label: value.gpName,
              value: `GP_${value.gpId}`,
            }),
          );

          setAllParameters((prevState) => [
            ...prevState,
            ...gpsForAllParameters,
          ]);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Buscando os Pontos de amostragem.
   */
  const getSpsLoading = useRequest(() => getSamplingPoints(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const sps: GenericSuccessResponse<FindSamplingPointData> =
          data as GenericSuccessResponse<FindSamplingPointData>;

        setSps(sps.data);
      }
    },
  }).loading;
  /**
   *
   */

  /**
   * Buscando os Parâmetros tóxicos.
   */
  const getTpsLoading = useRequest(
    () => getToxicParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const tps: GenericSuccessResponse<FindToxicParameterData> =
            data as GenericSuccessResponse<FindToxicParameterData>;

          const tpsForAllParameters: typeof allParameters = tps.data.map(
            (value) => ({
              label: value.tpName,
              value: `TP_${value.tpId}`,
            }),
          );

          setAllParameters((prevState) => [
            ...prevState,
            ...tpsForAllParameters,
          ]);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Buscando as Unidades.
   */
  const getUnsLoading = useRequest(() => getUnits(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const uns: GenericSuccessResponse<FindUnitData> =
          data as GenericSuccessResponse<FindUnitData>;

        setUns(uns.data);
      }
    },
  }).loading;
  /**
   *
   */

  /**
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () => horizontalImport(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          context!.setImportButtonFromModalIsClicked(true);

          context!.setShowHorizontalImportMappingModal(false);

          message.success("Dados importados com sucesso!");
        } else {
          context!.setImportButtonFromModalIsClicked(true);

          context!.setErrorResponse(data as GenericErrorResponse);
        }
      },
    },
  );

  return (
    <Modal
      cancelButtonProps={{
        color: "danger",
        variant: "link",
        onClick: () => {
          context!.setShowHorizontalImportMappingModal(false);

          const data_ = {
            filePath: context!.importMapping?.filePath,
          };

          deleteFile(data_ as unknown as FormData, data?.accessToken);
        },
      }}
      cancelText={Icons.cancel}
      centered
      closeIcon={false}
      destroyOnHidden
      maskClosable={false}
      modalRender={(node) => (
        <Form clearOnDestroy form={form} layout="vertical" onFinish={run}>
          {node}
        </Form>
      )}
      okButtonProps={{
        color: "green",
        htmlType: "submit",
        variant: "link",
      }}
      okText={loading ? <Spin /> : Icons.ok}
      open={context!.showHorizontalImportMappingModal}
      title="Mapear importação"
    >
      <Form.Item
        initialValue={context!.importMapping?.filePath}
        name={filePath}
        hidden
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Unidade de medida dos resultados de POPs"
        name={unIdForPOPs}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getUnsLoading}
          options={uns.map((value_) => {
            return { label: value_.unName, value: value_.unId };
          })}
        />
      </Form.Item>

      <Form.Item
        label="Unidade de medida dos resultados de Parâmetros tóxicos"
        name={unIdForTps}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getUnsLoading}
          options={uns.map((value_) => {
            return { label: value_.unName, value: value_.unId };
          })}
        />
      </Form.Item>

      <Card style={{ marginBottom: marginXS }} title="Parâmetros">
        {context!.importMapping!.mapping.parameters.map((value) => (
          <Form.Item
            key={value}
            label={value}
            name={[parameters, value]}
            rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
          >
            <Select
              loading={getGpsLoading || getTpsLoading}
              options={allParameters
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((value_) => {
                  return { label: value_.label, value: value_.value };
                })}
              showSearch={{ optionFilterProp: "label" }}
            />
          </Form.Item>
        ))}
      </Card>

      <Card style={{ marginBottom: marginXS }} title="Pontos de coleta">
        {context!.importMapping!.mapping.samplingPoints.map((value) => (
          <Form.Item
            key={value}
            label={value}
            name={[samplingPoints, value]}
            rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
          >
            <Select
              loading={getSpsLoading}
              options={sps.map((value_) => {
                return { label: value_.spName, value: value_.spId };
              })}
              showSearch={{ optionFilterProp: "label" }}
            />
          </Form.Item>
        ))}
      </Card>
    </Modal>
  );
};

export default HorizontalImportMappingModal;
