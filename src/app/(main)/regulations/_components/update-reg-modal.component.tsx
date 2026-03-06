/* API imports */
import getPublishers from "../../publishers/_api/get-pubs";
import updateRegulation from "../_api/update-reg";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { RegulationPropertiesEnum } from "@/enums/api/regulations/reg-properties.enum";
/* Other libraries imports */
import { App, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction, useState } from "react";
/* Request imports */
import UpdateRegulation from "@/requests/regulations/update-reg.request";
/* Response imports */
import FindPublisherData from "@/responses/publishers/find-pub-data.response";
import FindRegulationData from "@/responses/regulations/find-reg-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateRegulationModal */
const UpdateRegulationModal: React.FC<{
  regulation: FindRegulationData | undefined;
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
   * Nomes para os campos de formulários.
   */
  const regIdentifier: keyof UpdateRegulation = "regIdentifier";

  const regPublicationDate: keyof UpdateRegulation = "regPublicationDate";

  const regPubId: keyof UpdateRegulation = "regPubId";
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
   * Variáveis de estado.
   */
  const [pubs, setPubs] = useState<FindPublisherData[]>([]);
  /**
   *
   */

  /**
   * Buscando os publicadores.
   */
  const getPublishersLoading = useRequest(
    () => getPublishers(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const publishers: GenericSuccessResponse<FindPublisherData> =
            data as GenericSuccessResponse<FindPublisherData>;

          setPubs(publishers.data);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () =>
      updateRegulation(
        form.getFieldsValue(),
        props.regulation?.regId,
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
      instanceName={props.regulation?.regIdentifier}
      loading={loading}
      onFinish={run}
      setShowUpdateModal={props.setShowUpdateModal}
      showUpdateModal={props.showUpdateModal}
    >
      <Form.Item
        initialValue={dayjs(props.regulation?.regPublicationDate)}
        label={RegulationPropertiesEnum.PUBLICATION_DATE}
        name={regPublicationDate}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <DatePicker
          format={{ format: "DD/MM/YYYY" }}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={props.regulation?.regIdentifier}
        label={RegulationPropertiesEnum.IDENTIFIER}
        name={regIdentifier}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={props.regulation?.regPub.pubId}
        label={RegulationPropertiesEnum.PUBLISHER}
        name={regPubId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getPublishersLoading}
          options={pubs.map((pub) => {
            return { label: pub.pubAcronym, value: pub.pubId };
          })}
        />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateRegulationModal;
