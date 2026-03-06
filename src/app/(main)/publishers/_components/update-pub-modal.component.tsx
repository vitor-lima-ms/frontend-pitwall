/* API imports */
import updatePublisher from "../_api/update-pub";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { PublisherPropertiesEnum } from "@/enums/api/publishers/pub-properties.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import UpdatePublisher from "@/requests/publishers/update-pub.request";
/* Response imports */
import FindPublisherData from "@/responses/publishers/find-pub-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdatePublisherModal */
const UpdatePublisherModal: React.FC<{
  publisher: FindPublisherData | undefined;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setUpdateButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  showUpdateModal: boolean;
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
  const pubAcronym: keyof UpdatePublisher = "pubAcronym";

  const pubName: keyof UpdatePublisher = "pubName";
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
      updatePublisher(
        form.getFieldsValue(),
        props.publisher?.pubId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          props.setUpdateButtonIsClicked(true);

          props.setShowUpdateModal(false);

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
    <UpdateModal
      form={form}
      instanceName={props.publisher?.pubName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={props.setShowUpdateModal}
      showUpdateModal={props.showUpdateModal}
    >
      <Form.Item
        initialValue={props.publisher?.pubAcronym}
        label={PublisherPropertiesEnum.ACRONYM}
        name={pubAcronym}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.publisher?.pubName}
        label={PublisherPropertiesEnum.NAME}
        name={pubName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdatePublisherModal;
