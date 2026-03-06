/* API imports */
import getReport from "@/app/(main)/sampling-points/_api/smp/get-report";
/* Context imports */
import SpContext from "@/app/(main)/sampling-points/_context/sp-context";
/* Enum imports */
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
/* Icons imports */
import Icons from "@/app/_components/icons/icons";
/* Other libraries imports */
import {
  App,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { Dispatch, SetStateAction, useContext, useState } from "react";
/* Request imports */
import GetReport from "@/requests/samples/get-report.request";
/* GetReportModal */
const GetReportModal: React.FC<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  spName: string;
}> = (props) => {
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
   * TextArea.
   */
  const { TextArea } = Input;
  /**
   *
   */

  /**
   * Nomes para os campos de formulário.
   */
  const reportART: keyof GetReport = "reportART";

  const reportExpirationDate: keyof GetReport = "reportExpirationDate";

  const reportPOPSweep: keyof GetReport = "reportPOPSweep";

  const reportResponsible: keyof GetReport = "reportResponsible";

  const reportResponsibleIdentifier: keyof GetReport =
    "reportResponsibleIdentifier";

  const reportSampler17025: keyof GetReport = "reportSampler17025";

  const reportSamplerIdentifier: keyof GetReport = "reportSamplerIdentifier";

  const reportSamplerName: keyof GetReport = "reportSamplerName";

  const reportSampling10007: keyof GetReport = "reportSampling10007";

  const reportSamplingDescription: keyof GetReport =
    "reportSamplingDescription";

  const reportWasteOrigin: keyof GetReport = "reportWasteOrigin";
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
  const [popSweepCheck, setPOPSweepCheck] = useState(false);

  const [sampler17025Check, setSampler17025Check] = useState(false);

  const [sampling10007Check, setSampling10007Check] = useState(false);
  /**
   *
   */

  /**
   * Obtendo o relatório.
   */
  const { run, loading } = useRequest(
    () =>
      getReport(
        form.getFieldsValue(),
        context!.smp!.smpId,
        props.spName,
        context!.smp!.smpSamplingDate,
        data?.accessToken,
      ),
    {
      manual: true,
      onSuccess: () => {
        context!.setGenerateReportButtonIsClicked(true);

        message.success("Relatório emitido com sucesso!");
      },
    },
  );
  /**
   *
   */

  return (
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
        <Form clearOnDestroy form={form} layout="horizontal" onFinish={run}>
          {node}
        </Form>
      )}
      okButtonProps={{
        color: "green",
        htmlType: "submit",
        variant: "link",
      }}
      okText={loading ? <Spin /> : Icons.ok}
      onCancel={() => props.setShowModal(false)}
      open={props.showModal}
      title={"Gerar relatório"}
    >
      {context!.smp!.smpReportDetails ? (
        <Form.Item
          initialValue={dayjs(
            context!.smp!.smpReportDetails.reportExpirationDate,
          )}
          label="Data de validade"
          name={reportExpirationDate}
          rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
        >
          <DatePicker
            format={{ format: "DD/MM/YYYY" }}
            style={{ width: "100%" }}
          />
        </Form.Item>
      ) : (
        <Form.Item
          label="Data de validade"
          name={reportExpirationDate}
          rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
        >
          <DatePicker
            format={{ format: "DD/MM/YYYY" }}
            style={{ width: "100%" }}
          />
        </Form.Item>
      )}

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportSamplerName
            : ""
        }
        label="Nome/Razão social do amostrador"
        name={reportSamplerName}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportSamplerIdentifier
            : ""
        }
        label="CPF/CNPJ do amostrador"
        name={reportSamplerIdentifier}
      >
        <Input />
      </Form.Item>

      <Flex align="center" justify="space-around">
        <Form.Item
          initialValue={
            context!.smp!.smpReportDetails
              ? context!.smp!.smpReportDetails.reportSampler17025
              : false
          }
          name={reportSampler17025}
          valuePropName="checked"
        >
          <Checkbox
            checked={sampler17025Check}
            onChange={(event) => setSampler17025Check(event.target.checked)}
          >
            Amostrador acreditado pela 17025
          </Checkbox>
        </Form.Item>

        <Form.Item
          initialValue={
            context!.smp!.smpReportDetails
              ? context!.smp!.smpReportDetails.reportSampling10007
              : false
          }
          name={reportSampling10007}
          valuePropName="checked"
        >
          <Checkbox
            checked={sampling10007Check}
            onChange={(event) => setSampling10007Check(event.target.checked)}
          >
            Amostragem atende à 10007
          </Checkbox>
        </Form.Item>
      </Flex>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportPOPSweep
            : false
        }
        name={reportPOPSweep}
        valuePropName="checked"
      >
        <Checkbox
          checked={popSweepCheck}
          onChange={(event) => setPOPSweepCheck(event.target.checked)}
        >
          Análise de POPs feita por varredura, sem indicativo da presença de
          POPs
        </Checkbox>
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportSamplingDescription
            : ""
        }
        label="Descrição da amostragem"
        name={reportSamplingDescription}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportWasteOrigin
            : ""
        }
        label="Processo de origem do resíduo"
        name={reportWasteOrigin}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportResponsible
            : ""
        }
        label="Responsável técnico"
        name={reportResponsible}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportResponsibleIdentifier
            : ""
        }
        label="CPF/CNPJ do responsável técnico"
        name={reportResponsibleIdentifier}
        rules={[{ message: FeedbackEnum.REQUIRED_FIELD, required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={
          context!.smp!.smpReportDetails
            ? context!.smp!.smpReportDetails.reportART
              ? context!.smp!.smpReportDetails.reportART
              : ""
            : ""
        }
        label="Número da ART"
        name={reportART}
      >
        <Input />
      </Form.Item>
    </Modal>
  );
};

export default GetReportModal;
