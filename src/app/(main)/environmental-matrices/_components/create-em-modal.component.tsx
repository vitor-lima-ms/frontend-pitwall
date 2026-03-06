/* API imports */
import createEnvironmentalMatrix from "../_api/create-em";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Enum imports */
import { EnvironmentalMatrixPropertiesEnum } from "@/enums/api/environmental-matrices/em-properties.enum";
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import CreateEnvironmentalMatrix from "@/requests/environmental-matrices/create-em.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateEnvironmentalMatrixModal */
const CreateEnvironmentalMatrixModal: React.FC<{
  setCreateButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  showCreateModal: boolean;
}> = (props) => {
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
   * Nome para o campo de formulário.
   */
  const emName: keyof CreateEnvironmentalMatrix = "emName";
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
    () => createEnvironmentalMatrix(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          props.setCreateButtonIsClicked(true);

          props.setShowCreateModal(false);

          message.success(successResponse.data[0]);
        } else {
          props.setErrorResponse(data as GenericErrorResponse);
        }
      },
      ready: !!data?.accessToken,
      refreshDeps: [data?.accessToken],
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
      setShowCreateModal={props.setShowCreateModal}
      showCreateModal={props.showCreateModal}
      singularEntityName={SingularPagesNamesEnum.ENVIRONMENTAL_MATRIX}
    >
      <Form.Item
        label={EnvironmentalMatrixPropertiesEnum.NAME}
        name={emName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateEnvironmentalMatrixModal;
