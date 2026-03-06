/* API imports */
import createToxicParameter from "../../../../_api/tp/create-tp";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import TpContext from "../../../../_context/tp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { ToxicParameterPropertiesEnum } from "@/enums/api/toxic-parameters/tp-properties.enum";
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import { App, Form, Input } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext } from "react";
/* Request imports */
import CreateToxicParameter from "@/requests/toxic-parameters/create-tp.request";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateToxicParameterModal */
const CreateToxicParameterModal: React.FC = () => {
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
  const tpCasNumber: keyof CreateToxicParameter = "tpCasNumber";

  const tpEcCode: keyof CreateToxicParameter = "tpEcCode";

  const tpName: keyof CreateToxicParameter = "tpName";
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
    () => createToxicParameter(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowTpCreateModal(false);

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
      setShowCreateModal={context!.setShowTpCreateModal}
      showCreateModal={context!.showTpCreateModal}
      singularEntityName={SingularPagesNamesEnum.TOXIC_PARAMETER}
    >
      <Form.Item
        label={ToxicParameterPropertiesEnum.CAS_NUMBER}
        name={tpCasNumber}
      >
        <Input />
      </Form.Item>

      <Form.Item label={ToxicParameterPropertiesEnum.EC_CODE} name={tpEcCode}>
        <Input />
      </Form.Item>

      <Form.Item
        label={ToxicParameterPropertiesEnum.NAME}
        name={tpName}
        rules={[{ message: FeedbackEnum.SUCCESS_ON_FETCH, required: true }]}
      >
        <Input />
      </Form.Item>
    </CreateModal>
  );
};

export default CreateToxicParameterModal;
