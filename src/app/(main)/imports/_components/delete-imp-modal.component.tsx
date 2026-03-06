/* API imports */
import deleteImport from "../_api/delete-imp";
/* Component imports */
import DeleteModal from "@/app/_components/modals/delete-modal.component";
/* Other libraries imports */
import { App, Form } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindImportData from "@/responses/imports/find-imp-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* DeleteImportModal */
const DeleteImportModal: React.FC<{
  impId: FindImportData["impId"] | undefined;
  impName: FindImportData["impName"] | undefined;
  setDeleteButtonIsClicked: Dispatch<SetStateAction<boolean>>;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  showDeleteModal: boolean;
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
    () => deleteImport(props.impId!, data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          props.setDeleteButtonIsClicked(true);

          props.setShowDeleteModal(false);

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
    <DeleteModal
      form={form}
      instanceName={props.impName}
      loading={loading}
      onFinish={run}
      setShowDeleteModal={props.setShowDeleteModal}
      showDeleteModal={props.showDeleteModal}
    />
  );
};

export default DeleteImportModal;
