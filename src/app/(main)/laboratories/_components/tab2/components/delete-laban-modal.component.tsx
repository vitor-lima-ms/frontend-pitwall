/* API imports */
import deleteLaban from "../../../_api/laban/delete-laban";
/* Component imports */
import DeleteModal from "@/app/_components/modals/delete-modal.component";
/* Other libraries imports */
import { App, Form } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Response imports */
import FindLabanData from "@/responses/laboratories-analyses/find-laban-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* DeleteLabanModal */
const DeleteLabanModal: React.FC<{
  labanId: FindLabanData["labanId"] | undefined;
  labanName: FindLabanData["labanName"] | undefined;
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
    () => deleteLaban(props.labanId!, data?.accessToken),
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
      instanceName={props.labanName}
      loading={loading}
      onFinish={run}
      setShowDeleteModal={props.setShowDeleteModal}
      showDeleteModal={props.showDeleteModal}
    />
  );
};

export default DeleteLabanModal;
