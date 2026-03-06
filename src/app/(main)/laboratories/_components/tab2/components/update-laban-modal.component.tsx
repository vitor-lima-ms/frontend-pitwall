/* API imports */
import updateLaban from "../../../_api/laban/update-laban";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { LabanPropertiesEnum } from "@/enums/api/laboratories-analyses/laban-properties.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import UpdateLaban from "@/requests/laboratories-analyses/update-laban.request";
/* Response imports */
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateLabanModal */
const UpdateLabanModal: React.FC<{
  laban: FindLabanData | undefined;
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
  const labanName: keyof UpdateLaban = "labanName";
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
      updateLaban(
        form.getFieldsValue(),
        props.laban?.labanId,
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
      instanceName={props.laban?.labanName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={props.setShowUpdateModal}
      showUpdateModal={props.showUpdateModal}
    >
      <Form.Item
        initialValue={props.laban?.labanName}
        label={LabanPropertiesEnum.NAME}
        name={labanName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateLabanModal;
