/* FindToxicParameterData */
export default interface FindToxicParameterData {
  tpCasNumber: null | string;
  tpEcCode: null | string;
  tpId: string;
  tpName: string;
  tpSotps: {
    sotpId: string;
    sotpMfactor: null | number;
    sotpScocoh: {
      scocohAbbreviation: string;
      scocohDescription: string;
      scocohGcocoh: {
        gcocohClassifiesAsHazard: boolean;
        gcocohId: string;
        gcocohName: string;
        gcocohSummation: boolean;
      };
      scocohGenericMaxValue: null | number;
      scocohGenericMinValue: null | number;
      scocohHCode: {
        hcodeCode: string;
        hcodeId: string;
      };
      scocohId: string;
      scocohUn: {
        unId: string;
        unName: string;
      };
    };
    sotpSpecificMaxValue: null | number;
    sotpSpecificMinValue: null | number;
    sotpUn: {
      unId: string;
      unName: string;
    } | null;
  }[];
}
