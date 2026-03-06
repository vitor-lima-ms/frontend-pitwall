/* API imports */
import createSotp from "../../../../_api/sotp/create-sotp";
import getGcocohs from "../../../../../classes-or-categories-of-hazard/_api/get-gcocohs";
import getToxicParameters from "../../../../_api/tp/get-tps";
import getUnits from "../../../../../units/_api/get-uns";
/* Component imports */
import CreateModal from "@/app/_components/modals/create-modal.component";
/* Context imports */
import TpContext from "../../../../_context/tp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { SotpPropertiesEnum } from "@/enums/api/scocoh-of-toxic-parameters/sotp-properties.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import {
  App,
  Button,
  Card,
  Flex,
  Form,
  InputNumber,
  Select,
  theme,
} from "antd";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useContext, useState } from "react";
/* Request imports */
import CreateSotp from "@/requests/scocoh-of-toxic-parameters/create-sotp.request";
/* Response imports */
import FindGcocohData from "@/responses/generic-classes-or-categories-of-hazard/find-gcocoh-data.response";
import FindToxicParameterData from "@/responses/toxic-parameter/find-tp-data.response";
import FindUnitData from "@/responses/units/find-un-data.response";
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
/* CreateSotpModal */
const CreateSotpModal: React.FC = () => {
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
   * Estilos
   */
  const {
    token: { marginXS },
  } = theme.useToken();
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
  const sotpMfactor: keyof CreateSotp["sotpScocohs"][0] = "sotpMfactor";

  const sotpScocohId: keyof CreateSotp["sotpScocohs"][0] = "sotpScocohId";

  const sotpSpecificMaxValue: keyof CreateSotp["sotpScocohs"][0] =
    "sotpSpecificMaxValue";

  const sotpSpecificMinValue: keyof CreateSotp["sotpScocohs"][0] =
    "sotpSpecificMinValue";

  const sotpUnId: keyof CreateSotp["sotpScocohs"][0] = "sotpUnId";

  const sotpScocohs: keyof CreateSotp = "sotpScocohs";

  const sotpTpId: keyof CreateSotp = "sotpTpId";
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
    () => createSotp(form.getFieldsValue(), data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse: GenericSuccessResponse<string> =
            data as GenericSuccessResponse<string>;

          context!.setCreateButtonFromModalIsClicked(true);

          context!.setShowSotpCreateModal(false);

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
    <CreateModal
      form={form}
      loading={loading}
      onFinish={run}
      setShowCreateModal={context!.setShowSotpCreateModal}
      showCreateModal={context!.showSotpCreateModal}
      singularEntityName="Padrão de qualidade"
    >
      <Form.Item
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

      <Form.List name={sotpScocohs}>
        {(fields, { add, remove }) => (
          <Flex vertical>
            {fields.map((field) => (
              <Card
                extra={
                  <Button
                    color="danger"
                    icon={Icons.close}
                    onClick={() => remove(field.name)}
                    variant="link"
                  />
                }
                key={field.key}
                style={{ marginBottom: marginXS }}
                title={`${SotpPropertiesEnum.SCOCOH} ${field.name + 1}`}
              >
                <Form.Item
                  label={SotpPropertiesEnum.SCOCOH}
                  name={[field.name, sotpScocohId]}
                  rules={[
                    { message: FeedbackEnum.REQUIRED_FIELD, required: true },
                  ]}
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
                  label={SotpPropertiesEnum.SPECIFIC_MAX_VALUE}
                  name={[field.name, sotpSpecificMaxValue]}
                >
                  <InputNumber<string>
                    min="0"
                    step="0.0001"
                    stringMode
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label={SotpPropertiesEnum.SPECIFIC_MIN_VALUE}
                  name={[field.name, sotpSpecificMinValue]}
                >
                  <InputNumber<string>
                    min="0"
                    step="0.0001"
                    stringMode
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  label={SotpPropertiesEnum.M_FACTOR}
                  name={[field.name, sotpMfactor]}
                >
                  <InputNumber<string>
                    min="1"
                    stringMode
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  label={SotpPropertiesEnum.UNIT}
                  name={[field.name, sotpUnId]}
                >
                  <Select
                    loading={getUnsLoading}
                    options={uns.map((value) => {
                      return {
                        label: value.unName,
                        value: value.unId,
                      };
                    })}
                    placeholder="Apenas se houver valor máximo ou mínimo"
                  />
                </Form.Item>
              </Card>
            ))}

            <Button color="blue" onClick={() => add()} variant="dashed">
              + Adicionar
            </Button>
          </Flex>
        )}
      </Form.List>
    </CreateModal>
  );
};

export default CreateSotpModal;
