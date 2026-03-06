/* API imports */
import createPublisher from "../_api/create-pub";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { PublisherPropertiesEnum } from "@/enums/api/publishers/pub-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import CreatePublisher from "@/requests/publishers/create-pub.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreatePublisherModal */
const CreatePublisherModal: React.FC<{
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
  const pubAcronym: keyof CreatePublisher = "pubAcronym";

  const pubName: keyof CreatePublisher = "pubName";
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
    () => createPublisher(form.getFieldsValue(), data?.accessToken),
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
      singularEntityName={SingularPagesNamesEnum.PUBLISHER}
    >
      <Form.Item
        label={PublisherPropertiesEnum.ACRONYM}
        name={pubAcronym}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={PublisherPropertiesEnum.NAME}
        name={pubName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </CreateModal>
  );
};

export default CreatePublisherModal;
