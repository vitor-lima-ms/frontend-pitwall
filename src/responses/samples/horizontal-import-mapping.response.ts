/* HorizontalImportMapping */
export default interface HorizontalImportMapping {
  filePath: string;
  mapping: {
    environmentalMatrices: string[];
    parameters: string[];
    samplingPoints: string[];
  };
}
