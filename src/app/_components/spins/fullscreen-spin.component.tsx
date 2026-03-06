"use client";
/* Antd imports */
import { Spin } from "antd";
/* Other libraries imports */
import { useTitle } from "ahooks";
/* FullscreenSpin */
const FullscreenSpin: React.FC = () => {
  /**
   * Definindo o título da página.
   */
  useTitle("Carregando...");
  /**
   *
   */

  return (
    <Spin fullscreen size="large" styles={{ indicator: { color: "white" } }} />
  );
};

export default FullscreenSpin;
