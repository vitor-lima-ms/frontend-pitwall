/* Enum imports */
import { ColorPaletteEnum } from "@/enums/ui/color-palette.enum";
import { ColorThemeEnum } from "@/enums/ui/color-theme.enum";
/* Icon imports */
import Icons from "../icons/icons";
/* Other libraries imports */
import { Button, theme, Tooltip } from "antd";
import { SetState } from "ahooks/lib/createUseStorageState";
/* React imports */
import { useState } from "react";
/* ChangeThemeButton */
const ChangeThemeButton: React.FC<{
  colorTheme: ColorThemeEnum | undefined;
  setColorTheme: (value: SetState<ColorThemeEnum | undefined>) => void;
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
    <Tooltip
      placement="left"
      title={
        props.colorTheme === ColorThemeEnum.DARK
          ? "Mudar para o tema claro"
          : "Mudar para o tema escuro"
      }
    >
      <Button
        icon={
          props.colorTheme === ColorThemeEnum.DARK ? Icons.light : Icons.dark
        }
        onClick={() => {
          const colorTheme =
            props.colorTheme === ColorThemeEnum.DARK
              ? ColorThemeEnum.LIGHT
              : ColorThemeEnum.DARK;

          props.setColorTheme(colorTheme);
        }}
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

export default ChangeThemeButton;
