/* API imports */
import updateLaboratory from "../../../_api/lab/update-lab";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { LaboratoryPropertiesEnum } from "@/enums/api/laboratories/lab-properties.enum";
import { PublicPlaceTypesEnum } from "@/enums/api/laboratories/public-place-types.enum";
import { UfsEnum } from "@/enums/api/laboratories/ufs.enum";
/* Other libraries imports */
import { App, Form, Input, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction } from "react";
/* Request imports */
import UpdateLaboratory from "@/requests/laboratories/update-lab.request";
/* Response imports */
import FindLaboratoryData from "@/responses/laboratories/find-lab-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateLaboratoryModal */
const UpdateLaboratoryModal: React.FC<{
  laboratory: FindLaboratoryData | undefined;
  setErrorResponse: Dispatch<SetStateAction<GenericErrorResponse | undefined>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setUpdateButtonIsClicked: Dispatch<SetStateAction<boolean>>;
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
   * Nomes para os campos de formulário.
   */
  const labCep: keyof UpdateLaboratory = "labCep";

  const labCnpj: keyof UpdateLaboratory = "labCnpj";

  const labCompanyName: keyof UpdateLaboratory = "labCompanyName";

  const labEmail: keyof UpdateLaboratory = "labEmail";

  const labLocalityName: keyof UpdateLaboratory = "labLocalityName";

  const labMainContact: keyof UpdateLaboratory = "labMainContact";

  const labPhone: keyof UpdateLaboratory = "labPhone";

  const labPublicPlaceComplement: keyof UpdateLaboratory =
    "labPublicPlaceComplement";

  const labPublicPlaceName: keyof UpdateLaboratory = "labPublicPlaceName";

  const labPublicPlaceNumber: keyof UpdateLaboratory = "labPublicPlaceNumber";

  const labPublicPlaceType: keyof UpdateLaboratory = "labPublicPlaceType";

  const labUf: keyof UpdateLaboratory = "labUf";
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
      updateLaboratory(
        form.getFieldsValue(),
        props.laboratory?.labId,
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
    },
  );
  /**
   *
   */

  return (
    <UpdateModal
      form={form}
      instanceName={props.laboratory?.labCompanyName}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={props.setShowUpdateModal}
      showUpdateModal={props.showUpdateModal}
    >
      <Form.Item
        initialValue={props.laboratory?.labCompanyName}
        label={LaboratoryPropertiesEnum.COMPANY_NAME}
        name={labCompanyName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labCnpj}
        label={LaboratoryPropertiesEnum.CNPJ}
        name={labCnpj}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labEmail}
        label={LaboratoryPropertiesEnum.EMAIL}
        name={labEmail}
        rules={[
          { message: FeedbackEnum.REQUIRED_FIELD, required: true },
          { message: "E-mail inválido", type: "email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labPhone}
        label={LaboratoryPropertiesEnum.PHONE}
        name={labPhone}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labMainContact}
        label={LaboratoryPropertiesEnum.MAIN_CONTACT}
        name={labMainContact}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labCep}
        label={LaboratoryPropertiesEnum.CEP}
        name={labCep}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labUf}
        label={LaboratoryPropertiesEnum.UF}
        name={labUf}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          options={Object.entries(UfsEnum).map(([_, value]) => ({
            label: value,
            value: value,
          }))}
        />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labLocalityName}
        label={LaboratoryPropertiesEnum.LOCALITY_NAME}
        name={labLocalityName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labPublicPlaceType}
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_TYPE}
        name={labPublicPlaceType}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          options={Object.entries(PublicPlaceTypesEnum).map(([_, value]) => ({
            label: value,
            value: value,
          }))}
        />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labPublicPlaceName}
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_NAME}
        name={labPublicPlaceName}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labPublicPlaceNumber}
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_NUMBER}
        name={labPublicPlaceNumber}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.laboratory?.labPublicPlaceComplement}
        label={LaboratoryPropertiesEnum.PUBLIC_PLACE_COMPLEMENT}
        name={labPublicPlaceComplement}
      >
        <Input />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateLaboratoryModal;
