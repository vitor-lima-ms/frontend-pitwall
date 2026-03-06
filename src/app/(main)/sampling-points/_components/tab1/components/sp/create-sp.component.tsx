/* API imports */
import createSamplingPoint from "../../../../_api/sp/create-sp";
import getEnvironmentalMatrices from "@/app/(main)/environmental-matrices/_api/get-ems";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { SamplingPointPropertiesEnum } from "@/enums/api/sampling-points/sp-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input, InputNumber, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import CreateSamplingPoint from "@/requests/sampling-points/create-sp.request";
/* Response imports */
import FindEnvironmentalMatrixData from "@/responses/environmental-matrices/find-em-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateSamplingPointModal */
const CreateSamplingPointModal: React.FC = () => {
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
   * useForm.
   */
  const [form] = Form.useForm();
  /**
   *
   */

  /**
   * Nomes para os campos de formulário.
   */
  const spCoordX: keyof CreateSamplingPoint = "spCoordX";

  const spCoordY: keyof CreateSamplingPoint = "spCoordY";

  const spCoordZ: keyof CreateSamplingPoint = "spCoordZ";

  const spDescription: keyof CreateSamplingPoint = "spDescription";

  const spEmId: keyof CreateSamplingPoint = "spEmId";

  const spName: keyof CreateSamplingPoint = "spName";
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
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () => createSamplingPoint(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowSpCreateModal(false);

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
      setShowCreateModal={context!.setShowSpCreateModal}
      showCreateModal={context!.showSpCreateModal}
      singularEntityName={SingularPagesNamesEnum.SAMPLING_POINT}
    >
      <Form.Item
        label={SamplingPointPropertiesEnum.NAME}
        name={spName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={SamplingPointPropertiesEnum.DESCRIPTION}
        name={spDescription}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={SamplingPointPropertiesEnum.ENVIRONMENTAL_MATRIX}
        name={spEmId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getEmsLoading}
          options={ems.map((value) => {
            return {
              label: value.emName,
              value: value.emId,
            };
          })}
        />
      </Form.Item>

      <Form.Item
        label={SamplingPointPropertiesEnum.COORD_X}
        name={spCoordX}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <InputNumber<string>
          step="0.000001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label={SamplingPointPropertiesEnum.COORD_Y}
        name={spCoordY}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <InputNumber<string>
          step="0.000001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label={SamplingPointPropertiesEnum.COORD_Z} name={spCoordZ}>
        <InputNumber<string>
          step="0.000001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateSamplingPointModal;
