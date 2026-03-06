/* API imports */
import updateSamplingPoint from "../../../../_api/sp/update-sp";
import getEnvironmentalMatrices from "@/app/(main)/environmental-matrices/_api/get-ems";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { SamplingPointPropertiesEnum } from "@/enums/api/sampling-points/sp-properties.enum";
/* Other libraries imports */
import { App, Form, Input, InputNumber, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import UpdateSamplingPoint from "@/requests/sampling-points/update-sp.request";
/* Response imports */
import FindEnvironmentalMatrixData from "@/responses/environmental-matrices/find-em-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateSamplingPointModal */
const UpdateSamplingPointModal: React.FC = () => {
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
  const spCoordX: keyof UpdateSamplingPoint = "spCoordX";

  const spCoordY: keyof UpdateSamplingPoint = "spCoordY";

  const spCoordZ: keyof UpdateSamplingPoint = "spCoordZ";

  const spDescription: keyof UpdateSamplingPoint = "spDescription";

  const spEmId: keyof UpdateSamplingPoint = "spEmId";

  const spName: keyof UpdateSamplingPoint = "spName";
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
    () =>
      updateSamplingPoint(
        form.getFieldsValue(),
        context!.sp!.spId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowSpUpdateModal(false);

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
    <UpdateModal
      form={form}
      instanceName={context!.sp?.spName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowSpUpdateModal}
      showUpdateModal={context!.showSpUpdateModal}
    >
      <Form.Item
        initialValue={context!.sp?.spName}
        label={SamplingPointPropertiesEnum.NAME}
        name={spName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.sp?.spDescription}
        label={SamplingPointPropertiesEnum.DESCRIPTION}
        name={spDescription}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.sp?.spEm.emId}
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
        initialValue={context!.sp?.spCoordX.toString()}
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
        initialValue={context!.sp?.spCoordY.toString()}
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

      <Form.Item
        initialValue={
          context!.sp?.spCoordZ ? context!.sp?.spCoordZ.toString() : null
        }
        label={SamplingPointPropertiesEnum.COORD_Z}
        name={spCoordZ}
      >
        <InputNumber<string>
          step="0.000001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateSamplingPointModal;
