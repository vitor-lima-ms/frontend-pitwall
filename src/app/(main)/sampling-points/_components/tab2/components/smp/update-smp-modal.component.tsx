/* API imports */
import updateSample from "../../../../_api/smp/update-smp";
import getSamplingPoints from "../../../../_api/sp/get-sps";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import SpContext from "../../../../_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { SamplePropertiesEnum } from "@/enums/api/samples/smp-properties.enum";
/* Other libraries imports */
import { App, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import UpdateSample from "@/requests/samples/update-smp.request";
/* Response imports */
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateSampleModal */
const UpdateSampleModal: React.FC = () => {
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
  const smpDepth: keyof UpdateSample = "smpDepth";

  const smpDescription: keyof UpdateSample = "smpDescription";

  const smpSamplingDate: keyof UpdateSample = "smpSamplingDate";

  const smpSpId: keyof UpdateSample = "smpSpId";
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
  const [sps, setSps] = useState<FindSamplingPointData[]>([]);
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
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () =>
      updateSample(
        form.getFieldsValue(),
        context!.smp!.smpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowSmpUpdateModal(false);

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
      instanceName="Amostra"
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowSmpUpdateModal}
      showUpdateModal={context!.showSmpUpdateModal}
    >
      {context!.smp?.smpSamplingDate ? (
        <Form.Item
          initialValue={dayjs(context!.smp?.smpSamplingDate)}
          label={SamplePropertiesEnum.SAMPLING_DATE}
          name={smpSamplingDate}
        >
          <DatePicker
            format={{ format: "DD/MM/YYYY HH:mm:ss" }}
            showTime
            style={{ width: "100%" }}
          />
        </Form.Item>
      ) : (
        <Form.Item
          label={SamplePropertiesEnum.SAMPLING_DATE}
          name={smpSamplingDate}
        >
          <DatePicker
            format={{ format: "DD/MM/YYYY HH:mm:ss" }}
            showTime
            style={{ width: "100%" }}
          />
        </Form.Item>
      )}

      <Form.Item
        initialValue={context!.smp?.smpDescription}
        label={SamplePropertiesEnum.DESCRIPTION}
        name={smpDescription}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.spIdAndName?.spId}
        label={SamplePropertiesEnum.SAMPLING_POINT}
        name={smpSpId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getSpsLoading}
          options={sps.map((sp) => {
            return { label: sp.spName, value: sp.spId };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.smp?.smpDepth}
        label={SamplePropertiesEnum.DEPTH}
        name={smpDepth}
      >
        <InputNumber<string>
          min="0"
          step="0.001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateSampleModal;
