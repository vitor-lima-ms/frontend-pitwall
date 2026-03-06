/* API imports */
import updateGposmp from "@/app/(main)/sampling-points/_api/gposmp/update-gposmp";
import getGenericParameters from "@/app/(main)/generic-parameters/_api/gp/get-gps";
import getUnits from "@/app/(main)/units/_api/get-uns";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import SpContext from "@/app/(main)/sampling-points/_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { GposmpPropertiesEnum } from "@/enums/api/generic-parameters-of-samples/gposmp-properties.enum";
/* Other libraries imports */
import { App, Form, Input, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import UpdateGposmp from "@/requests/generic-parameters-of-samples/update-gposmp.request";
/* Response imports */
import FindGenericParameterData from "@/responses/generic-parameters/find-gp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateGposmpModal */
const UpdateGposmpModal: React.FC = () => {
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
   * Nomes para os campos de formulário.
   */
  const gposmpGpId: keyof UpdateGposmp = "gposmpGpId";

  const gposmpOriginalValue: keyof UpdateGposmp = "gposmpOriginalValue";

  const gposmpSmpId: keyof UpdateGposmp = "gposmpSmpId";

  const gposmpUnId: keyof UpdateGposmp = "gposmpUnId";
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
  const [gps, setGps] = useState<FindGenericParameterData[]>([]);

  const [uns, setUns] = useState<FindUnitData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Parâmetros genéricos.
   */
  const getGpsLoading = useRequest(
    () => getGenericParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const tps: GenericSuccessResponse<FindGenericParameterData> =
            data as GenericSuccessResponse<FindGenericParameterData>;

          setGps(tps.data);
        }
      },
    },
  ).loading;
  /**
   *
   */

  /**
   * Buscando as Unidades.
   */
  const getUnsLoading = useRequest(() => getUnits(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const uns: GenericSuccessResponse<FindUnitData> =
          data as GenericSuccessResponse<FindUnitData>;

        setUns(uns.data);
      }
    },
  }).loading;
  /**
   *
   */

  /**
   * Enviando os dados.
   */
  const { loading, run } = useRequest(
    () =>
      updateGposmp(
        form.getFieldsValue(),
        context!.gposmp!.gposmpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowGposmpUpdateModal(false);

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
      instanceName="Parâmetro genérico da Amostra"
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowGposmpUpdateModal}
      showUpdateModal={context!.showGposmpUpdateModal}
    >
      <Form.Item initialValue={context!.smpId?.smpId} name={gposmpSmpId} hidden>
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={context!.gposmp?.gposmpGp.gpId}
        label={GposmpPropertiesEnum.GENERIC_PARAMETER}
        name={gposmpGpId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getGpsLoading}
          options={gps.map((value) => {
            return { label: value.gpName, value: value.gpId };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.gposmp?.gposmpOriginalValue}
        label={GposmpPropertiesEnum.ORIGINAL_VALUE}
        name={gposmpOriginalValue}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        initialValue={context!.gposmp?.gposmpUn.unId}
        label={GposmpPropertiesEnum.UNIT}
        name={gposmpUnId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getUnsLoading}
          options={uns.map((value) => {
            return {
              label: value.unName,
              value: value.unId,
            };
          })}
        />
      </Form.Item>
    </UpdateModal>
  );
};

export default UpdateGposmpModal;
