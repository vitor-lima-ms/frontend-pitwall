"use client";
/* API imports */
import askQuestion from "./_api/ask-question";
/* Enum imports */
import { SingularPagesNamesEnum } from "@/enums/ui/singular-pages-names.enum";
/* Other libraries imports */
import {
  App,
  Avatar,
  Button,
  Col,
  Card,
  Flex,
  Input,
  theme,
  Typography,
} from "antd";
import { RobotOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest, useTitle } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useEffect, useRef, useState } from "react";
/* Response imports */
import GenericErrorResponse from "@/responses/generic-error.response";
import GenericSuccessResponse from "@/responses/generic-success.response";
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
/* RagChat */
interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
}

interface RagAnswerData {
  answer: string;
  question: string;
}

const RagChat: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(SingularPagesNamesEnum.HOME);
  /**
   *
   */

  /**
   * useSession.
   */
  const { data } = useSession();
  /**
   *
   */

  /**
   * Estilos.
   */
  const {
    token: { size },
  } = theme.useToken();
  /**
   *
   */

  /**
   * Variáveis de estado e referências.
   */
  const [errorResponse, setErrorResponse] = useState<GenericErrorResponse>();

  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  /**
   *
   */

  /**
   * Antd App Wrapper.
   */
  const { notification } = App.useApp();
  /**
   *
   */

  /**
   * Efeito para auto-scroll das mensagens.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  /**
   *
   */

  /**
   * Buscando os dados.
   */
  const { loading, run } = useRequest(
    (question: string) => askQuestion(question, data?.accessToken),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          const successResponse =
            data as unknown as GenericSuccessResponse<RagAnswerData>;

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: "bot",
              text: successResponse.data[0].answer,
            },
          ]);
        } else {
          setErrorResponse(data as GenericErrorResponse);
        }
      },
    },
  );
  /**
   *
   */

  /**
   * Efeito para exibir os erros.
   */
  useEffect(() => {
    if (errorResponse) {
      notification.error({
        showProgress: true,
        title: errorResponse.details,
      });
    }
  }, [errorResponse, notification]);
  /**
   *
   */

  /**
   * Handlers.
   */
  const handleSendMessage = () => {
    if (!inputValue.trim() || loading) return;

    const currentQuestion = inputValue.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text: currentQuestion,
      },
    ]);

    setInputValue("");

    run(currentQuestion);
  };
  /**
   *
   */

  return (
    <Flex align="center" justify="center" style={{ width: "100%" }}>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          height: "65vh",
          overflow: "hidden",
          padding: size,
          width: "100%",
        }}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          },
        }}
        title="Assistente de Enquadramento na LGR"
      >
        <Flex
          gap="middle"
          style={{ flexGrow: 1, overflowY: "auto", paddingBottom: size }}
          vertical
        >
          {messages.length === 0 && (
            <Flex align="center" justify="center" style={{ height: "100%" }}>
              <Typography.Text type="secondary">
                Envie uma pergunta sobre o enquadramento na LGR.
              </Typography.Text>
            </Flex>
          )}

          {messages.map((msg) => (
            <Flex
              align="flex-start"
              gap="small"
              key={msg.id}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                maxWidth: "85%",
              }}
            >
              <Avatar
                icon={
                  msg.sender === "user" ? <UserOutlined /> : <RobotOutlined />
                }
                style={{
                  backgroundColor:
                    msg.sender === "user"
                      ? ColorPaletteEnum.SECONDARY_COLOR
                      : ColorPaletteEnum.PRIMARY_COLOR,
                  flexShrink: 0,
                }}
              />
              <Col
                ref={messagesEndRef}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
                  {msg.text}
                </Typography.Text>
              </Col>
            </Flex>
          ))}

          {loading && (
            <Flex align="center" gap="small">
              <Avatar
                icon={<RobotOutlined />}
                style={{ backgroundColor: "#52c41a" }}
              />
              <Typography.Text type="secondary">
                Analisando os documentos...
              </Typography.Text>
            </Flex>
          )}
        </Flex>

        <Flex gap="small" style={{ marginTop: size }}>
          <Input
            disabled={loading}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Digite sua pergunta..."
            size="middle"
            value={inputValue}
          />
          <Button
            icon={<SendOutlined />}
            loading={loading}
            onClick={handleSendMessage}
            size="middle"
            type="primary"
          >
            Enviar
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default RagChat;
