/* API imports */
import deleteQsfgp from "../../../../_api/qsfgp/delete-qsfgp";
/* Component imports */
import DeleteModal from "@/app/_components/modals/delete-modal.component";
/* Context imports */
import GpContext from "../../../../_context/gp-context";
/* Other libraries imports */
import { App, Form } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext } from "react";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* DeleteQsfgpModal */
const DeleteQsfgpModal: React.FC = () => {
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
    () => deleteQsfgp(context!.qsfgp!.qsfgpId, data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setDeleteButtonFromModalIsClicked(true);

          context!.setShowQsfgpDeleteModal(false);

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
    <DeleteModal
      form={form}
      instanceName="Padrão de qualidade"
      loading={loading}
      onFinish={run}
      setShowDeleteModal={context!.setShowQsfgpDeleteModal}
      showDeleteModal={context!.showQsfgpDeleteModal}
    />
  );
};

export default DeleteQsfgpModal;
