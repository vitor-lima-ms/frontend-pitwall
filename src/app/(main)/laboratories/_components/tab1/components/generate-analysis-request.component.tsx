/* API imports */
import generateAnalysisRequest from "../../../_api/lab/generate-analysis-request";
import getGenericParameters from "@/app/(main)/generic-parameters/_api/gp/get-gps";
import getLabans from "../../../_api/laban/get-labans";
import getSamplingPoints from "@/app/(main)/sampling-points/_api/sp/get-sps";
import getToxicParameters from "@/app/(main)/toxic-parameters/_api/tp/get-tps";
/* Component imports  */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { App, Button, Card, Flex, Form, Input, Select, theme } from "antd";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction, useState } from "react";
/* Request imports */
import GenerateAnalysisRequest from "@/requests/laboratories/generate-analysis-request.request";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* GenerateAnalysisRequestModal */
const GenerateAnalysisRequestModal: React.FC<{
  setShowGenerateAnalysisRequestModal: Dispatch<SetStateAction<boolean>>;
  showGenerateAnalysisRequestModal: boolean;
}> = (props) => {
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
   * useSession.
   */
  const { data } = useSession();
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
  const gpsNames: keyof GenerateAnalysisRequest["analysesRequests"][0] =
    "gpsNames";

  const labanName: keyof GenerateAnalysisRequest["analysesRequests"][0] =
    "labanName";

  const smpsNames: keyof GenerateAnalysisRequest["analysesRequests"][0] =
    "smpsNames";

  const tpsNames: keyof GenerateAnalysisRequest["analysesRequests"][0] =
    "tpsNames";

  const obs: keyof GenerateAnalysisRequest["analysesRequests"][0] = "obs";
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
  const [gps, setGps] = useState<FindGenericParameterData[]>([]);

  const [labans, setLabans] = useState<FindLabanData[]>([]);

  const [smps, setSmps] = useState<
    (Pick<
      FindSamplingPointData["spSamples"][0],
      "smpId" | "smpSamplingDate"
    > & { spName: string })[]
  >([]);

  const [tps, setTps] = useState<FindToxicParameterData[]>([]);

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
          const tps: GenericSuccessResponse<FindGenericParameterData> =
            data as GenericSuccessResponse<FindGenericParameterData>;

          setGps(tps.data);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Buscando as Análises laboratoriais.
   */
  const getLabansLoading = useRequest(() => getLabans(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const labans: GenericSuccessResponse<FindLabanData> =
          data as GenericSuccessResponse<FindLabanData>;

        setLabans(labans.data);
      }
    },
  }).loading;
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

        const smps: (Pick<
          FindSamplingPointData["spSamples"][0],
          "smpId" | "smpSamplingDate"
        > & { spName: string })[] = [];

        for (let i = 0; i < sps.data.length; i++) {
          const value = sps.data[i];

          for (let j = 0; j < value.spSamples.length; j++) {
            const value_ = value.spSamples[j];

            smps.push({
              smpId: value_.smpId,
              smpSamplingDate: value_.smpSamplingDate,
              spName: value.spName,
            });
          }
        }

        setSmps(smps);
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

          setTps(tps.data);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Obtendo a Solicitação de análise.
   */
  const { loading, run } = useRequest(
    () => generateAnalysisRequest(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: () => {
        message.success("Solicitação de análise emitida com sucesso!");
      },
    },
  );
  /**
   *
   */

  return (
    <CreateModal
      form={form}
      loading={loading}
      onFinish={run}
      setShowCreateModal={props.setShowGenerateAnalysisRequestModal}
      showCreateModal={props.showGenerateAnalysisRequestModal}
      singularEntityName="Solicitação de análise"
    >
      <Form.List name="analysesRequests">
        {(fields, { add, remove }) => (
          <Flex vertical>
            {fields.map((field) => (
              <Card
                extra={
                  <Button
                    color="danger"
                    icon={Icons.close}
                    onClick={() => remove(field.name)}
                    variant="link"
                  />
                }
                key={field.key}
                style={{ marginBottom: marginXS }}
                title={`Solicitação de análise ${field.name + 1}`}
              >
                <Form.Item
                  label="Análise laboratorial"
                  name={[field.name, labanName]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
                >
                  <Select
                    loading={getLabansLoading}
                    options={labans.map((value) => ({
                      label: value.labanName,
                      value: value.labanName,
                    }))}
                    showSearch={{ optionFilterProp: "label" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Amostras"
                  name={[field.name, smpsNames]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
                >
                  <Select
                    loading={getSpsLoading}
                    mode="multiple"
                    options={smps.map((value) => ({
                      label: `${value.spName} - ${dayjs(
                        value.smpSamplingDate,
                      ).format("DD/MM/YYYY")}`,
                      value: `${value.spName} - ${dayjs(
                        value.smpSamplingDate,
                      ).format("DD/MM/YYYY")}`,
                    }))}
                    showSearch={{ optionFilterProp: "label" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Parâmetros genéricos"
                  name={[field.name, gpsNames]}
                >
                  <Select
                    loading={getGpsLoading}
                    mode="multiple"
                    options={gps.map((value) => ({
                      label: value.gpName,
                      value: value.gpName,
                    }))}
                    showSearch={{ optionFilterProp: "label" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Parâmetros tóxicos"
                  name={[field.name, tpsNames]}
                >
                  <Select
                    loading={getTpsLoading}
                    mode="multiple"
                    options={tps.map((value) => ({
                      label: value.tpName,
                      value: value.tpName,
                    }))}
                    showSearch={{ optionFilterProp: "label" }}
                  />
                </Form.Item>

                <Form.Item label="Observações" name={[field.name, obs]}>
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Card>
            ))}

            <Button color="blue" onClick={() => add()} variant="dashed">
              + Adicionar
            </Button>
          </Flex>
        )}
      </Form.List>
    </CreateModal>
  );
};

export default GenerateAnalysisRequestModal;
