/* API imports */
import EPADeleteFile from "../_api/epa-delete-file";
import EPAHorizontalImport_ from "../_api/epa-horizontal-imports";
import getGenericParameters from "@/app/(main)/generic-parameters/_api/gp/get-gps";
import getRegulations from "@/app/(main)/regulations/_api/get-regs";
import getUnits from "@/app/(main)/units/_api/get-uns";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import { App, Card, Form, Input, Modal, Select, Spin, theme } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction, useState } from "react";
/* Request imports */
import EPAHorizontalImport from "@/requests/app-utils/epa-horizontal-import.request";
import EPAHorizontalImportMapping from "@/responses/app-utils/epa-horizontal-import-mapping.reponse";
/* Response imports */
import EPAEvaluation from "@/responses/app-utils/epa-evaluation.response";
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* EPAHorizontalImportMappingModal */
const EPAHorizontalImportMappingModal: React.FC<{
  EPAHorizontalImportMapping: EPAHorizontalImportMapping | undefined;
  setEPAEvaluation: Dispatch<
    SetStateAction<GenericSuccessResponse<EPAEvaluation> | undefined>
  >;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowEPAHorizontalImportMappingModal: Dispatch<SetStateAction<boolean>>;
  showEPAHorizontalImportMappingModal: boolean;
}> = (props) => {
  /**
   * useSession.
   */
  const { data } = useSession();
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
  const filePath: keyof EPAHorizontalImport = "filePath";

  const parameters: keyof EPAHorizontalImport = "parameters";

  const regId: keyof EPAHorizontalImport = "regId";

  const unId: keyof EPAHorizontalImport = "unId";
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

  const [regs, setRegs] = useState<FindRegulationData[]>([]);

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

          setGps(gps.data);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Buscando as Normas.
   */
  const getRegsLoading = useRequest(() => getRegulations(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const regs: GenericSuccessResponse<FindRegulationData> =
          data as GenericSuccessResponse<FindRegulationData>;

        setRegs(regs.data);
      }
    },
  }).loading;
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
    () => EPAHorizontalImport_(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          props.setEPAEvaluation(data as GenericSuccessResponse<EPAEvaluation>);

          props.setShowEPAHorizontalImportMappingModal(false);

          message.success("Dados enviados com sucesso!");
        } else {
          props.setErrorResponse(data as GenericErrorResponse);
        }
      },
    },
  );
  /**
   *
   */

  return (
    <Modal
      cancelButtonProps={{
        color: "danger",
        variant: "link",
        onClick: () => {
          props.setShowEPAHorizontalImportMappingModal(false);

          const data_ = {
            filePath: props.EPAHorizontalImportMapping?.filePath,
          };

          EPADeleteFile(data_ as unknown as FormData, data?.accessToken);
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
      open={props.showEPAHorizontalImportMappingModal}
      title="Mapear importação"
    >
      <Form.Item
        initialValue={props.EPAHorizontalImportMapping?.filePath}
        name={filePath}
        hidden
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Unidade de medida"
        name={unId}
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
        label="Norma"
        name={regId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getRegsLoading}
          options={regs.map((value_) => {
            return {
              label: `${value_.regPub.pubAcronym} ${value_.regIdentifier}/${
                value_.regPublicationDate.split("-")[0]
              }`,
              value: value_.regId,
            };
          })}
        />
      </Form.Item>

      <Card style={{ marginBottom: marginXS }} title="Parâmetros">
        {props.EPAHorizontalImportMapping?.mapping.parameters.map((value) => (
          <Form.Item
            key={value}
            label={value}
            name={[parameters, value]}
            rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
          >
            <Select
              loading={getGpsLoading}
              options={gps
                .sort((a, b) => a.gpName.localeCompare(b.gpName))
                .map((value_) => {
                  return { label: value_.gpName, value: value_.gpId };
                })}
              showSearch={{ optionFilterProp: "label" }}
            />
          </Form.Item>
        ))}
      </Card>
    </Modal>
  );
};

export default EPAHorizontalImportMappingModal;
