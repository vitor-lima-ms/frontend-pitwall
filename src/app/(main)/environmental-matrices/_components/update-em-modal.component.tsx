/* API imports */
import updateEnvironmentalMatrix from "../_api/update-em";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Enum imports */
import { EnvironmentalMatrixPropertiesEnum } from "@/enums/api/environmental-matrices/em-properties.enum";
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import UpdateEnvironmentalMatrix from "@/requests/environmental-matrices/update-em.request";
/* Response imports */
import FindEnvironmentalMatrixData from "@/responses/environmental-matrices/find-em-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateEnvironmentalMatrixModal */
const UpdateEnvironmentalMatrixModal: React.FC<{
  environmentalMatrix: FindEnvironmentalMatrixData | undefined;
  setUpdateButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
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
   * Nome para o campo de formulário.
   */
  const emName: keyof UpdateEnvironmentalMatrix = "emName";
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
      updateEnvironmentalMatrix(
        form.getFieldsValue(),
        props.environmentalMatrix?.emId,
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
      ready: !!data?.accessToken,
      refreshDeps: [data?.accessToken],
    },
  );
  /**
   *
   */

  return (
    <UpdateModal
      form={form}
      instanceName={props.environmentalMatrix?.emName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={props.setShowUpdateModal}
      showUpdateModal={props.showUpdateModal}
    >
      <Form.Item
        initialValue={props.environmentalMatrix?.emName}
        label={EnvironmentalMatrixPropertiesEnum.NAME}
        name={emName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateEnvironmentalMatrixModal;
