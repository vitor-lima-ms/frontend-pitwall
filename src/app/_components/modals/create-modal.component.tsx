/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Form, FormInstance, FormProps, Modal, Spin } from "antd";
/* React imports */
import { Dispatch, ReactNode, SetStateAction } from "react";
/* CreateModal */
const CreateModal: React.FC<{
  children: ReactNode;
  form: FormInstance;
  loading: boolean;
  onFinish: FormProps["onFinish"];
  singularEntityName: string;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  showCreateModal: boolean;
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
        layout="horizontal"
        onFinish={props.onFinish}
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
    onCancel={() => props.setShowCreateModal(false)}
    open={props.showCreateModal}
    title={`Adicionar ${props.singularEntityName}`}
  >
    {props.children}
  </Modal>
);

export default CreateModal;
