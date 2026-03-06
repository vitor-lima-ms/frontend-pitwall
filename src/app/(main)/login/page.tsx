"use client";
/* API imports */
import { signIn } from "next-auth/react";
/* Enum imports */
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
import { FeedbackEnum } from "@/enums/ui/feedback.enum";
import { LocalStorageEnum } from "@/enums/ui/local-storage.enum";
import { LogosPathsEnum } from "@/enums/ui/logos-paths.enum";
import { RoutePathEnum } from "@/enums/ui/route-paths.enum";
/* Next.js imports */
import Image from "next/image";
/* Other libraries imports */
import { App, Button, Card, Flex, Form, Input, theme } from "antd";
import { useLocalStorageState, useRequest, useTitle } from "ahooks";
import { useRouter } from "next/navigation";
/* React imports */
import { useEffect, useState } from "react";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";

/* Login */
const Login: React.FC = () => {
  /**
   * Definindo o título da página.
   */
  useTitle("Login"); // Ou use um Enum se tiver
  /**
   *
   */

  /**
   * Estilos.
   */
  const {
    token: { boxShadow, sizeXL },
  } = theme.useToken();
  /**
   *
   */

  /**
   * Hook de navegação e Antd App Wrapper.
   */
  const { message, notification } = App.useApp();

  const router = useRouter();
  /**
   *
   */

  /**
   * Lógica para qual logo será exibida.
   */
  const [colorTheme, _] = useLocalStorageState<ColorThemeEnum | undefined>(
    LocalStorageEnum.COLOR_THEME,
  );

  let logoPath: LogosPathsEnum;

  if (colorTheme === ColorThemeEnum.DARK) {
    logoPath = LogosPathsEnum.LIGHT_FULL_LOGO;
  } else {
    logoPath = LogosPathsEnum.DARK_FULL_LOGO;
  }
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();
  /**
   *
   */

  /**
   * Função de login.
   */
  const loginRequest = async (values: any) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false /* Crucial para tratar o erro via Antd Notification e não via redirect de URL! */,
    });

    if (result?.error) {
      throw new Error("Credenciais inválidas ou erro no servidor.");
    }

    return result;
  };

  /**
   * Executando login.
   */
  const { loading, run } = useRequest(loginRequest, {
    manual: true,
    onSuccess: () => {
      message.success("Login realizado com sucesso!");

      /* Redirecionamento após sucesso */
      router.push(RoutePathEnum.HOME);
    },
    onError: (error) => {
      setErrorResponse({
        success: false,
        details: error.message || "Ocorreu um erro ao tentar realizar o login.",
      } as GenericErrorResponse);
    },
  });
  /**
   *
   */

  /**
   * Efeito para exibir os erros.
   */
  useEffect(() => {
    if (errorResponse) {
      notification.error({ showProgress: true, title: errorResponse.details });
    }
  }, [errorResponse, notification]);
  /**
   *
   */

  return (
    <Flex align="center" justify="center">
      <Card style={{ boxShadow }}>
        <Flex align="center" gap="large" vertical>
          <Image
            alt="AmbTec logo"
            height={sizeXL}
            src={logoPath}
            width={sizeXL * 5}
          />

          <Form
            disabled={loading}
            layout="vertical"
            onFinish={run}
            style={{ width: 300 }}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: FeedbackEnum.REQUIRED_FIELD },
                { type: "email", message: "Insira um e-mail válido!" },
              ]}
            >
              <Input placeholder="exemplo@email.com" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: FeedbackEnum.REQUIRED_FIELD }]}
            >
              <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;
