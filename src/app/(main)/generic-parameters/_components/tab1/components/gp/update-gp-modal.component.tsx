/* API imports */
import updateGenericParameter from "../../../../_api/gp/update-gp";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import GpContext from "../../../../_context/gp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { GenericParameterPropertiesEnum } from "@/enums/api/generic-parameters/gp-properties.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext } from "react";
/* Request imports */
import UpdateGenericParameter from "@/requests/generic-parameters/update-gp.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateGenericParameterModal */
const UpdateGenericParameterModal: React.FC = () => {
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
   * Nome para o campo de formulário.
   */
  const gpName: keyof UpdateGenericParameter = "gpName";
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
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () =>
      updateGenericParameter(
        form.getFieldsValue(),
        context!.gp?.gpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowGpUpdateModal(false);

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
      instanceName={context!.gp?.gpName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowGpUpdateModal}
      showUpdateModal={context!.showGpUpdateModal}
    >
      <Form.Item
        initialValue={context!.gp?.gpName}
        label={GenericParameterPropertiesEnum.NAME}
        name={gpName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateGenericParameterModal;
