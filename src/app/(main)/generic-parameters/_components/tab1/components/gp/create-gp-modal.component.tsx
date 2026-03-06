/* API imports */
import createGenericParameter from "../../../../_api/gp/create-gp";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import GpContext from "../../../../_context/gp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { GenericParameterPropertiesEnum } from "@/enums/api/generic-parameters/gp-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext } from "react";
/* Request imports */
import CreateGenericParameter from "@/requests/generic-parameters/create-gp.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateGenericParameterModal */
const CreateGenericParameterModal: React.FC = () => {
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
  const gpName: keyof CreateGenericParameter = "gpName";
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
    () => createGenericParameter(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowGpCreateModal(false);

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
      setShowCreateModal={context!.setShowGpCreateModal}
      showCreateModal={context!.showGpCreateModal}
      singularEntityName={SingularPagesNamesEnum.GENERIC_PARAMETER}
    >
      <Form.Item
        label={GenericParameterPropertiesEnum.NAME}
        name={gpName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateGenericParameterModal;
