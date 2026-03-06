"use client";
/* Antd imports */
import {
  App as AntdWrapper,
  ConfigProvider as AntdConfigProvider,
  theme,
} from "antd";
import ptBR from "antd/locale/pt_BR";
/* AntdLayout import */
import AntdLayout from "@/app/_components/antd-layout/antd-layout.component";
/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
import { LocalStorageEnum } from "@/enums/ui/local-storage.enum";
/* Font imports */
import stolzl from "../_font/stolzl";
/* Other libraries imports */
import { SessionProvider } from "next-auth/react";
import { useLocalStorageState } from "ahooks";
/* RootLayout */
const RootLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  /**
   * Lógica para dark/light theme.
   */
  const [colorTheme, setColorTheme] = useLocalStorageState<
    ColorThemeEnum | undefined
  >(LocalStorageEnum.COLOR_THEME, {
    defaultValue: ColorThemeEnum.LIGHT,
  });
  /**
   *
   */

  return (
    <AntdConfigProvider
      componentSize="small"
      locale={ptBR}
      theme={{
        algorithm:
          colorTheme === ColorThemeEnum.DARK
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        components: {
          Layout: {
            lightSiderBg: ColorPaletteEnum.PRIMARY_COLOR,
            siderBg: ColorPaletteEnum.SECONDARY_COLOR,
          },
          Menu: {
            colorBgContainer: ColorPaletteEnum.PRIMARY_COLOR,
            darkItemBg: ColorPaletteEnum.SECONDARY_COLOR,
            darkItemColor: ColorPaletteEnum.PRIMARY_COLOR,
            darkItemHoverBg: "#0000000F" /* Não mudar! */,
            darkItemHoverColor: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
            darkItemSelectedBg: ColorPaletteEnum.BLACK /* Não mudar */,
            darkItemSelectedColor: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
            darkPopupBg: ColorPaletteEnum.DARK_SUBMENU_BACKGROUND,
            darkSubMenuItemBg: ColorPaletteEnum.DARK_SUBMENU_BACKGROUND,
            itemColor: ColorPaletteEnum.SECONDARY_COLOR,
            itemHoverColor: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
            itemSelectedBg: "#F5F5F5" /* Não mudar! */,
            itemSelectedColor: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
            popupBg: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
            subMenuItemBg: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
            subMenuItemSelectedColor: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
          },
        },
        token: {
          blue: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
          colorPrimary:
            colorTheme === ColorThemeEnum.DARK
              ? ColorPaletteEnum.PRIMARY_COLOR
              : ColorPaletteEnum.SECONDARY_COLOR,
          fontFamily: stolzl.style.fontFamily,
        },
      }}
    >
      <AntdWrapper message={{ duration: 1, pauseOnHover: false }}>
        <SessionProvider>
          <AntdLayout colorTheme={colorTheme} setColorTheme={setColorTheme}>
            {props.children}
          </AntdLayout>
        </SessionProvider>
      </AntdWrapper>
    </AntdConfigProvider>
  );
};

export default RootLayout;
