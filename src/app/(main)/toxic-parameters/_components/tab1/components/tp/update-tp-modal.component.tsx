/* API imports */
import updateToxicParameter from "../../../../_api/tp/update-tp";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import TpContext from "../../../../_context/tp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { ToxicParameterPropertiesEnum } from "@/enums/api/toxic-parameters/tp-properties.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext } from "react";
/* Request imports */
import UpdateToxicParameter from "@/requests/toxic-parameters/update-tp.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateToxicParameterModal */
const UpdateToxicParameterModal: React.FC = () => {
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
  const context = useContext(TpContext);
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
   * Nomes para os campos de fomulário.
   */
  const tpCasNumber: keyof UpdateToxicParameter = "tpCasNumber";

  const tpEcCode: keyof UpdateToxicParameter = "tpEcCode";

  const tpName: keyof UpdateToxicParameter = "tpName";
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
      updateToxicParameter(
        form.getFieldsValue(),
        context!.tp?.tpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowTpUpdateModal(false);

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
      instanceName={context!.tp?.tpName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowTpUpdateModal}
      showUpdateModal={context!.showTpUpdateModal}
    >
      <Form.Item
        initialValue={context!.tp?.tpCasNumber}
        label={ToxicParameterPropertiesEnum.CAS_NUMBER}
        name={tpCasNumber}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.tp?.tpEcCode}
        label={ToxicParameterPropertiesEnum.EC_CODE}
        name={tpEcCode}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.tp?.tpName}
        label={ToxicParameterPropertiesEnum.NAME}
        name={tpName}
        rules={[{ message: FeedbackEnum.SUCCESS_ON_FETCH, required: true }]}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateToxicParameterModal;
