/* API imports */
import deleteTposmp from "@/app/(main)/sampling-points/_api/tposmp/delete-tposmp";
/* Component imports */
import DeleteModal from "@/app/_components/modals/delete-modal.component";
/* Context imports */
import SpContext from "@/app/(main)/sampling-points/_context/sp-context";
/* Other libraries */
import { App, Form } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext } from "react";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* DeleteTposmpModal */
const DeleteTposmpModal: React.FC = () => {
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
  const context = useContext(SpContext);
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
    () => deleteTposmp(context!.tposmp!.tposmpId, data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setDeleteButtonFromModalIsClicked(true);

          context!.setShowTposmpDeleteModal(false);

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
      instanceName="Resultado"
      loading={loading}
      onFinish={run}
      setShowDeleteModal={context!.setShowTposmpDeleteModal}
      showDeleteModal={context!.showTposmpDeleteModal}
    />
  );
};

export default DeleteTposmpModal;
