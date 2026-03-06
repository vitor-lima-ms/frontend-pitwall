/* API imports */
import updateUnit from "../_api/update-un";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { UnitPropertiesEnum } from "@/enums/api/units/un-properties.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import UpdateUnit from "@/requests/units/update-un.request";
/* Response imports */
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateUnitModal */
const UpdateUnitModal: React.FC<{
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setUpdateButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  showUpdateModal: boolean;
  unit: FindUnitData | undefined;
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
  const unName: keyof UpdateUnit = "unName";
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
      updateUnit(form.getFieldsValue(), props.unit?.unId, data?.accessToken),
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
      instanceName={props.unit?.unName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={props.setShowUpdateModal}
      showUpdateModal={props.showUpdateModal}
    >
      <Form.Item
        initialValue={props.unit?.unName}
        label={UnitPropertiesEnum.NAME}
        name={unName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateUnitModal;
