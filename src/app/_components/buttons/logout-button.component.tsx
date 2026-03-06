/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
/* Icon imports */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, theme, Tooltip } from "antd";
import { signOut } from "next-auth/react";
/* React imports */
import { useState } from "react";
/* LogoutButton */
const LogoutButton: React.FC<{
  colorTheme: ColorThemeEnum | undefined;
}> = (props) => {
  /**
   * Estilos.
   */
  const {
    token: { motionDurationSlow },
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
    <Tooltip placement="left" title="Sair">
      <Button
        icon={Icons.logout}
        onClick={() => signOut()}
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
        styles={{
          icon: {
            color: buttonColor,
            transition: motionDurationSlow,
          },
        }}
        type="link"
      />
    </Tooltip>
  );
};

export default LogoutButton;
