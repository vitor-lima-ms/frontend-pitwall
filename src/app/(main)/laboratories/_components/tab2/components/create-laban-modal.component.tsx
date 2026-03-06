/* API imports */
import createLaban from "../../../_api/laban/create-laban";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { LabanPropertiesEnum } from "@/enums/api/laboratories-analyses/laban-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import CreateLaban from "@/requests/laboratories-analyses/create-laban.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateLabanModal */
const CreateLabanModal: React.FC<{
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
   * Nomes para os campos de formulário.
   */
  const labanName: keyof CreateLaban = "labanName";
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
    () => createLaban(form.getFieldsValue(), data?.accessToken),
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
      singularEntityName={SingularPagesNamesEnum.LABORATORY_ANALYSIS}
    >
      <Form.Item
        label={LabanPropertiesEnum.NAME}
        name={labanName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateLabanModal;
