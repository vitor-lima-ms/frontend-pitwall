/* HorizontalImport */
export default interface HorizontalImport {
  filePath: string;
  parameters: {
    [key: string]: string;
  };
  samplingPoints: {
    [key: string]: string;
  };
  unIdForPOPs: string;
  unIdForTps: string;
}
