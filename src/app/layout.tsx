"use client";
/* Component imports */
import FullscreenSpin from "./_components/spins/fullscreen-spin.component";
/* CSS import */
import "./globals.css";
/* Other libraries imports */
import { AntdRegistry } from "@ant-design/nextjs-registry";
/* React imports */
import { useEffect, useEffectEvent, useState } from "react";
/* RootLayout */
const RootLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const [isClient, setIsClient] = useState(false);

  const setIsClientEvent = useEffectEvent(() => setIsClient(true));

  useEffect(() => {
    setIsClientEvent();
  }, []);

  return isClient ? (
    <html lang="en">
      <body>
        <AntdRegistry>{props.children}</AntdRegistry>
      </body>
    </html>
  ) : (
    <html>
      <body>
        <FullscreenSpin />
      </body>
    </html>
  );
};

export default RootLayout;
