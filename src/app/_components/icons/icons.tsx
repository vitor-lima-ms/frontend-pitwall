/* Antd imports */
import { createFromIconfontCN } from "@ant-design/icons";
/* Enum imports */
import { IconFontEnum } from "@/enums/ui/iconfont.enum";
/* Icons */
const IconFont = createFromIconfontCN({
  scriptUrl: IconFontEnum.URL,
});

const Icons = {
  calculator: <IconFont type="icon-calculator-one-filled" />,
  cancel: <IconFont type="icon-handle-x-filled" />,
  classify: <IconFont type="icon-file-question-filled" />,
  clear: <IconFont type="icon-clear-format-filled" />,
  close: <IconFont type="icon-close" />,
  cocoh: <IconFont type="icon-caution-filled" />,
  collapseSidebar: <IconFont type="icon-left-one-filled" />,
  create: <IconFont type="icon-add-one-filled" />,
  dark: <IconFont type="icon-moon-filled" />,
  delete: <IconFont type="icon-delete-filled" />,
  download: <IconFont type="icon-download" />,
  em: <IconFont type="icon-leaves-two-filled" />,
  expandSidebar: <IconFont type="icon-right-one-filled" />,
  genericParameter: <IconFont type="icon-experiment-one-filled" />,
  import: <IconFont type="icon-import-and-export" />,
  laboratory: <IconFont type="icon-cuvette-filled" />,
  light: <IconFont type="icon-sun-filled" />,
  logout: <IconFont type="icon-logout" />,
  map: <IconFont type="icon-map-draw-filled" />,
  ok: <IconFont type="icon-check-one-filled" />,
  publisher: <IconFont type="icon-palace-filled" />,
  reclassify: <IconFont type="icon-redo" />,
  regulation: <IconFont type="icon-file-protection-filled" />,
  report: <IconFont type="icon-table-report-filled" />,
  samplingPointsAndSamples: <IconFont type="icon-local-filled" />,
  search: <IconFont type="icon-search-filled" />,
  toxicParameter: <IconFont type="icon-radiation-filled" />,
  unit: <IconFont type="icon-ruler-one-filled" />,
  update: <IconFont type="icon-edit-two-filled" />,
  user: <IconFont type="icon-user-filled" />,
  utils: <IconFont type="icon-folder-open-filled" />,
};

export default Icons;
