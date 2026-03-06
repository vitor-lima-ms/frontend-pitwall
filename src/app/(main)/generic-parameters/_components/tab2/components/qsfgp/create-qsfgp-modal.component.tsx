/* API imports */
import createQsfgp from "../../../../_api/qsfgp/create-qsfgp";
import getEnvironmentalMatrices from "../../../../../environmental-matrices/_api/get-ems";
import getGenericParameters from "../../../../_api/gp/get-gps";
import getRegulations from "../../../../../regulations/_api/get-regs";
import getUnits from "../../../../../units/_api/get-uns";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import GpContext from "../../../../_context/gp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { QsfgpPropertiesEnum } from "@/enums/api/quality-standards-for-generic-parameters/qsfgp-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input, InputNumber, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import CreateQsfgp from "@/requests/quality-standards-for-generic-parameters/create-qsfgp.request";
/* Response imports */
import FindEnvironmentalMatrixData from "@/responses/environmental-matrices/find-em-data.response";
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateQsfgpModal */
const CreateQsfgpModal: React.FC = () => {
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
  const context = useContext(GpContext);
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
  const qsfgpEmId: keyof CreateQsfgp = "qsfgpEmId";

  const qsfgpEmParticularity: keyof CreateQsfgp = "qsfgpEmParticularity";

  const qsfgpGpId: keyof CreateQsfgp = "qsfgpGpId";

  const qsfgpMaxValue: keyof CreateQsfgp = "qsfgpMaxValue";

  const qsfgpMinValue: keyof CreateQsfgp = "qsfgpMinValue";

  const qsfgpRegId: keyof CreateQsfgp = "qsfgpRegId";

  const qsfgpUnId: keyof CreateQsfgp = "qsfgpUnId";
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
  const [ems, setEms] = useState<FindEnvironmentalMatrixData[]>([]);

  const [gps, setGps] = useState<FindGenericParameterData[]>([]);

  const [regs, setRegs] = useState<FindRegulationData[]>([]);

  const [uns, setUns] = useState<FindUnitData[]>([]);
  /**
   *
   */

  /**
   * Buscando as Matrizes ambientais.
   */
  const getEmsLoading = useRequest(
    () => getEnvironmentalMatrices(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const ems: GenericSuccessResponse<FindEnvironmentalMatrixData> =
            data as GenericSuccessResponse<FindEnvironmentalMatrixData>;

          setEms(ems.data);
        }
      },
    },
  ).loading;
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
    () => createQsfgp(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowQsfgpCreateModal(false);

          message.success(successResponse.data[0]);
        } else {
          context!.setErrorResponse(data as GenericErrorResponse);
        }
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
      setShowCreateModal={context!.setShowQsfgpCreateModal}
      showCreateModal={context!.showQsfgpCreateModal}
      singularEntityName="Padrão de qualidade"
    >
      <Form.Item
        label={SingularPagesNamesEnum.GENERIC_PARAMETER}
        name={qsfgpGpId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getGpsLoading}
          options={gps.map((value) => {
            return { label: value.gpName, value: value.gpId };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        label={QsfgpPropertiesEnum.REGULATION}
        name={qsfgpRegId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getRegsLoading}
          options={regs.map((value) => {
            return {
              label: `${value.regPub.pubAcronym} ${value.regIdentifier}/${
                value.regPublicationDate.split("-")[0]
              }`,
              value: value.regId,
            };
          })}
        />
      </Form.Item>

      <Form.Item
        label={QsfgpPropertiesEnum.ENVIRONMENTAL_MATRIX}
        name={qsfgpEmId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getEmsLoading}
          options={ems.map((value) => {
            return { label: value.emName, value: value.emId };
          })}
        />
      </Form.Item>

      <Form.Item
        label={QsfgpPropertiesEnum.ENVIRONMENTAL_MATRIX_PARTICULARITY}
        name={qsfgpEmParticularity}
      >
        <Input />
      </Form.Item>

      <Form.Item label={QsfgpPropertiesEnum.MAX_VALUE} name={qsfgpMaxValue}>
        <InputNumber<string>
          min="0"
          step="0.0001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label={QsfgpPropertiesEnum.MIN_VALUE} name={qsfgpMinValue}>
        <InputNumber<string>
          min="0"
          step="0.0001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label={QsfgpPropertiesEnum.UNIT}
        name={qsfgpUnId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getUnsLoading}
          options={uns.map((value) => {
            return { label: value.unName, value: value.unId };
          })}
        />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateQsfgpModal;
