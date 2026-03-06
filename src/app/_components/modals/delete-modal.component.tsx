/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Form, FormInstance, FormProps, Modal, Spin } from "antd";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* DeleteModal */
const DeleteModal: React.FC<{
  form: FormInstance;
  instanceName: string | undefined;
  loading: boolean;
  onFinish: FormProps["onFinish"];
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  showDeleteModal: boolean;
}> = (props) => (
  <Modal
    cancelButtonProps={{
      color: "danger",
      variant: "link",
    }}
    cancelText={Icons.cancel}
    centered
    closeIcon={false}
    destroyOnHidden
    maskClosable={false}
    modalRender={(node) => (
      <Form
        clearOnDestroy
        form={props.form}
        onFinish={props.onFinish}
        layout="vertical"
      >
        {node}
      </Form>
    )}
    okButtonProps={{
      color: "green",
      htmlType: "submit",
      variant: "link",
    }}
    okText={props.loading ? <Spin /> : Icons.ok}
    onCancel={() => props.setShowDeleteModal(false)}
    open={props.showDeleteModal}
    title={`Deseja apagar ${props.instanceName}?`}
  />
);

export default DeleteModal;
