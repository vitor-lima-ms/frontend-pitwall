/* FindGcocohData */
export default interface FindGcocohData {
  gcocohClassifiesAsHazard: boolean;
  gcocohId: string;
  gcocohName: string;
  gcocohScocohs: {
    scocohAbbreviation: string;
    scocohDescription: string;
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
  }[];
  gcocohSummation: boolean;
}
