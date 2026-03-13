/* Component imports */
import MainHeaderContent from "@/app/_components/headers/main-header-content.component";
import MinHeaderContent from "@/app/_components/headers/min-header-content.component";
import SiderMenu from "./sider-menu.component";
/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
import { LogosPathsEnum } from "@/enums/ui/logos-paths.enum";
import { RoutePathEnum } from "@/enums/ui/route-paths.enum";
/* Next.js imports */
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
/* Other libraries imports */
import { Col, Grid, Layout, Row, theme, Typography } from "antd";
import { SetState } from "ahooks/lib/createUseStorageState";
import { useFavicon } from "ahooks";
/* React imports */
import { useState } from "react";
/* MyLayout */
const { Content, Footer, Header, Sider } = Layout;

const AntdLayout: React.FC<{
  colorTheme: ColorThemeEnum | undefined;
  children: React.ReactNode;
  setColorTheme: (value: SetState<ColorThemeEnum | undefined>) => void;
}> = (props) => {
  /**
   * Favicon.
   */
  let faviconPath: LogosPathsEnum;

  if (props.colorTheme === ColorThemeEnum.DARK) {
    faviconPath = LogosPathsEnum.LIGHT_LOGO;
  } else {
    faviconPath = LogosPathsEnum.DARK_LOGO;
  }

  useFavicon(faviconPath);
  /**
   *
   */

  /**
   * Router.
   */
  const router = useRouter();

  const pathname = usePathname() as RoutePathEnum;
  /**
   *
   */

  /**
   * Estilos.
   */
  const {
    token: {
      colorBgContainer,
      borderRadius,
      boxShadow,
      fontSizeHeading4,
      fontSizeSM,
      marginMD,
      paddingMD,
      paddingSM,
      sizeSM,
      sizeXL,
    },
  } = theme.useToken();
  /**
   *
   */

  /**
   * Typography.
   */
  const { Text } = Typography;

  /**
   * Controle dos breakpoints.
   */
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();

  const screenNotOnMdSize = screens.md;

  const screenNotOnSmSize = screens.sm;
  /**
   *
   */

  /**
   * Controle do menu lateral.
   */
  const [collapsed, setCollapsed] = useState(true);
  /**
   *
   */

  /**
   * Controle do hover sobre a logo.
   */
  const [mouseHoverLogo, setMouseHoverLogo] = useState(false);
  /**
   *
   */

  /**
   * Controle de qual logo será exibida.
   */
  let logoPath: LogosPathsEnum;

  if (collapsed && props.colorTheme === ColorThemeEnum.DARK) {
    logoPath = LogosPathsEnum.DARK_LOGO;
  } else if (!collapsed && props.colorTheme === ColorThemeEnum.DARK) {
    logoPath = LogosPathsEnum.DARK_FULL_LOGO;
  } else if (collapsed && props.colorTheme === ColorThemeEnum.LIGHT) {
    logoPath = LogosPathsEnum.LIGHT_LOGO;
  } else {
    logoPath = LogosPathsEnum.LIGHT_FULL_LOGO;
  }
  /**
   *
   */

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          insetInlineStart: 0,
          position: "sticky",
          overflow: "auto",
          scrollbarColor:
            props.colorTheme === ColorThemeEnum.DARK
              ? `${ColorPaletteEnum.PRIMARY_COLOR} ${ColorPaletteEnum.SECONDARY_COLOR}`
              : `${ColorPaletteEnum.SECONDARY_COLOR} ${ColorPaletteEnum.PRIMARY_COLOR}`,
          top: 0,
        }}
        theme={props.colorTheme === ColorThemeEnum.DARK ? "dark" : "light"}
        trigger={null}
        width={screenNotOnMdSize && screenNotOnSmSize ? 331.25 : 200}
      >
        <Col style={{ height: 60.25, padding: paddingSM }}>
          <Row justify="center">
            <Image
              alt="AmbTec logo"
              height={sizeXL}
              onClick={() => router.push("/")}
              onMouseEnter={() => setMouseHoverLogo(true)}
              onMouseLeave={() => setMouseHoverLogo(false)}
              src={logoPath}
              style={{ cursor: mouseHoverLogo ? "pointer" : "auto" }}
              width={collapsed ? sizeXL : sizeXL * 5}
            />
          </Row>
        </Col>

        <Col>
          <SiderMenu
            collapsed={collapsed}
            colorTheme={props.colorTheme}
            pathname={pathname}
            router={router}
            screenNotOnMdSize={screenNotOnMdSize}
            screenNotOnSmSize={screenNotOnSmSize}
          />
        </Col>
      </Sider>

      <Layout>
        <Header
          style={{
            background:
              props.colorTheme === ColorThemeEnum.DARK
                ? ColorPaletteEnum.SECONDARY_COLOR
                : ColorPaletteEnum.PRIMARY_COLOR,
            fontSize: fontSizeHeading4,
            paddingLeft: paddingSM,
            paddingRight: paddingSM,
          }}
        >
          {screenNotOnMdSize && screenNotOnSmSize ? (
            <MainHeaderContent
              collapsed={collapsed}
              colorTheme={props.colorTheme}
              margin={marginMD}
              pathname={pathname}
              setCollapsed={setCollapsed}
              setColorTheme={props.setColorTheme}
            />
          ) : (
            <MinHeaderContent
              collapsed={collapsed}
              colorTheme={props.colorTheme}
              margin={marginMD}
              setCollapsed={setCollapsed}
              setColorTheme={props.setColorTheme}
            />
          )}
        </Header>

        <Content
          hidden={
            !screenNotOnMdSize && !screenNotOnSmSize && !collapsed
              ? true
              : false
          }
          style={{ margin: marginMD }}
        >
          <Col
            style={{
              background: colorBgContainer,
              boxShadow,
              borderRadius,
              minHeight: "fit-content",
              padding: paddingMD,
            }}
          >
            {props.children}
          </Col>
        </Content>

        <Footer
          hidden={
            !screenNotOnMdSize && !screenNotOnSmSize && !collapsed
              ? true
              : false
          }
          style={{
            background:
              props.colorTheme === ColorThemeEnum.DARK
                ? ColorPaletteEnum.SECONDARY_COLOR
                : ColorPaletteEnum.PRIMARY_COLOR,
            fontSize: fontSizeSM,
            padding: paddingSM,
            textAlign: "center",
          }}
        >
          <Text type="secondary" style={{ fontSize: sizeSM }}>
            AmbTec © {new Date().getFullYear()} by Hidrogeo Tecnologia!
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AntdLayout;
