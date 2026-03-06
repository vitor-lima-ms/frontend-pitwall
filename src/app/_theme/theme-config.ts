/* Antd imports */
import { type ThemeConfig } from "antd";
/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
/* Montserrat import */
import stolzl from "../_font/stolzl";
/* theme */
const myTheme: ThemeConfig = {
  components: {
    Layout: {
      lightSiderBg: ColorPaletteEnum.PRIMARY_COLOR,
      siderBg: ColorPaletteEnum.SECONDARY_COLOR,
    },
    Menu: {
      colorBgContainer: ColorPaletteEnum.PRIMARY_COLOR,
      darkItemBg: ColorPaletteEnum.SECONDARY_COLOR,
      darkItemColor: ColorPaletteEnum.PRIMARY_COLOR,
      darkItemHoverBg: "#0000000F", /* Não mudar! */
      darkItemHoverColor: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
      darkItemSelectedBg: ColorPaletteEnum.BLACK, /* Não mudar */
      darkItemSelectedColor: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
      darkPopupBg: ColorPaletteEnum.DARK_SUBMENU_BACKGROUND,
      darkSubMenuItemBg: ColorPaletteEnum.DARK_SUBMENU_BACKGROUND,
      itemColor: ColorPaletteEnum.SECONDARY_COLOR ,
      itemHoverColor: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
      itemSelectedBg: "#F5F5F5", /* Não mudar! */
      itemSelectedColor: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
      popupBg: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
      subMenuItemBg: ColorPaletteEnum.PRIMARY_COLOR_LIGHT,
      subMenuItemSelectedColor: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
    },
  },
  token: {
    blue: ColorPaletteEnum.SECONDARY_COLOR_LIGHT,
    colorPrimary: ColorPaletteEnum.PRIMARY_COLOR,
    fontFamily: stolzl.style.fontFamily,
  },
};

export default myTheme;
