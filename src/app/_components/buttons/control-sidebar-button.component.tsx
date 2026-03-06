/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
/* Icons import */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, theme } from "antd";
/* React imports */
import { Dispatch, SetStateAction, useState } from "react";
/* ControlSidebarButton */
const ControlSidebarButton: React.FC<{
  collapsed: boolean;
  colorTheme: ColorThemeEnum | undefined;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  /**
   * Estilos.
   */
  const {
    token: { motionDurationSlow, sizeLG },
  } = theme.useToken();
  /**
   *
   */

  /**
   * Controle do hover sobre o botão
   */
  const [mouseHover, setMouseHover] = useState(false);
  /**
   *
   */

  /**
   * Condicional para determinar a cor do botão.
   */
  let buttonColor: string;

  if (mouseHover && props.colorTheme === ColorThemeEnum.DARK) {
    buttonColor = ColorPaletteEnum.PRIMARY_COLOR_LIGHT;
  } else if (!mouseHover && props.colorTheme === ColorThemeEnum.DARK) {
    buttonColor = ColorPaletteEnum.PRIMARY_COLOR;
  } else if (mouseHover && props.colorTheme === ColorThemeEnum.LIGHT) {
    buttonColor = ColorPaletteEnum.SECONDARY_COLOR_LIGHT;
  } else {
    buttonColor = ColorPaletteEnum.SECONDARY_COLOR;
  }
  /**
   *
   */

  return (
    <Button
      color="default"
      icon={props.collapsed ? Icons.expandSidebar : Icons.collapseSidebar}
      onClick={() => props.setCollapsed(!props.collapsed)}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      styles={{
        icon: {
          color: buttonColor,
          fontSize: sizeLG,
          transition: motionDurationSlow,
        },
      }}
      type="link"
    />
  );
};

export default ControlSidebarButton;
