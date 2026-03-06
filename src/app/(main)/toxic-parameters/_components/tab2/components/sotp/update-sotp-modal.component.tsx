/* API imports */
import updateSotp from "../../../../_api/sotp/update-sotp";
import getGcocohs from "@/app/(main)/classes-or-categories-of-hazard/_api/get-gcocohs";
import getToxicParameters from "../../../../_api/tp/get-tps";
import getUnits from "@/app/(main)/units/_api/get-uns";
/* Component imports */
import UpdateModal from "@/app/_components/modals/update-modal.component";
/* Context imports */
import TpContext from "../../../../_context/tp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { SotpPropertiesEnum } from "@/enums/api/scocoh-of-toxic-parameters/sotp-properties.enum";
/* Other libraries imports */
import { App, Form, InputNumber, Select } from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import UpdateSotp from "@/requests/scocoh-of-toxic-parameters/update-sotp.request";
/* Response imports */
import FindGcocohData from "@/responses/generic-classes-or-categories-of-hazard/find-gcocoh-data.response";
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* UpdateSotpModal */
const UpdateSotpModal: React.FC = () => {
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
   * Nomes para os campos de formulário.
   */
  const sotpMfactor: keyof UpdateSotp = "sotpMfactor";

  const sotpScocohId: keyof UpdateSotp = "sotpScocohId";

  const sotpSpecificMaxValue: keyof UpdateSotp = "sotpSpecificMaxValue";

  const sotpSpecificMinValue: keyof UpdateSotp = "sotpSpecificMinValue";

  const sotpUnId: keyof UpdateSotp = "sotpUnId";

  const sotpTpId: keyof UpdateSotp = "sotpTpId";
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
  const [scocohs, setScocohs] = useState<FindGcocohData["gcocohScocohs"]>([]);

  const [tps, setTps] = useState<FindToxicParameterData[]>([]);

  const [uns, setUns] = useState<FindUnitData[]>([]);
  /**
   *
   */

  /**
   * Buscando as Gcocohs.
   */
  const getGcocohsLoading = useRequest(() => getGcocohs(data?.accessToken), {
    onSuccess: (data) => {
      if (data.success) {
        const gcocohs: GenericSuccessResponse<FindGcocohData> =
          data as GenericSuccessResponse<FindGcocohData>;

        const scocohs: FindGcocohData["gcocohScocohs"] = [];

        gcocohs.data.forEach((value) => {
          value.gcocohScocohs.forEach((value_) => {
            const scocoh: FindGcocohData["gcocohScocohs"][0] = {
              scocohAbbreviation: value_.scocohAbbreviation,
              scocohDescription: value_.scocohDescription,
              scocohGenericMaxValue: value_.scocohGenericMaxValue,
              scocohGenericMinValue: value_.scocohGenericMinValue,
              scocohHCode: value_.scocohHCode,
              scocohId: value_.scocohId,
              scocohUn: value_.scocohUn,
            };

            scocohs.push(scocoh);
          });
        });

        setScocohs(scocohs);
      }
    },
  }).loading;
  /**
   *
   */

  /**
   * Buscando os Parâmetros tóxicos.
   */
  const getTpsLoading = useRequest(
    () => getToxicParameters(data?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const tps: GenericSuccessResponse<FindToxicParameterData> =
            data as GenericSuccessResponse<FindToxicParameterData>;

          setTps(tps.data);
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
      updateSotp(
        form.getFieldsValue(),
        context!.sotp!.sotpId,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setUpdateButtonFromModalIsClicked(true);

          context!.setShowSotpUpdateModal(false);

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
      instanceName="Padrão de qualidade"
      loading={loading}
      onFinish={run}
      setShowUpdateModal={context!.setShowSotpUpdateModal}
      showUpdateModal={context!.showSotpUpdateModal}
    >
      <Form.Item
        initialValue={context!.tpIdAndName?.tpId}
        label={SotpPropertiesEnum.TOXIC_PARAMETER}
        name={sotpTpId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getTpsLoading}
          options={tps.map((value) => {
            return { label: value.tpName, value: value.tpId };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.sotp?.sotpScocoh.scocohId}
        label={SotpPropertiesEnum.SCOCOH}
        name={sotpScocohId}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Select
          loading={getGcocohsLoading}
          options={scocohs.map((value) => {
            return {
              label: `${value.scocohHCode.hcodeCode} - ${value.scocohDescription}`,
              value: value.scocohId,
            };
          })}
          showSearch={{ optionFilterProp: "label" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.sotp?.sotpSpecificMaxValue?.toString()}
        label={SotpPropertiesEnum.SPECIFIC_MAX_VALUE}
        name={sotpSpecificMaxValue}
      >
        <InputNumber<string>
          min="0"
          step="0.0001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.sotp?.sotpSpecificMinValue?.toString()}
        label={SotpPropertiesEnum.SPECIFIC_MIN_VALUE}
        name={sotpSpecificMinValue}
      >
        <InputNumber<string>
          min="0"
          step="0.0001"
          stringMode
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        initialValue={context!.sotp?.sotpMfactor?.toString()}
        label={SotpPropertiesEnum.M_FACTOR}
        name={sotpMfactor}
      >
        <InputNumber<string> min="1" stringMode style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        initialValue={context!.sotp?.sotpUn?.unId}
        label={SotpPropertiesEnum.UNIT}
        name={sotpUnId}
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

export default UpdateSotpModal;
