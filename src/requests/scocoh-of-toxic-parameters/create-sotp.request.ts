/* CreateSotp */
export default interface CreateSotp {
  sotpScocohs: {
    sotpMfactor?: null | string;
    sotpScocohId: string;
    sotpSpecificMaxValue?: null | string;
    sotpSpecificMinValue?: null | string;
    sotpUnId?: null | string;
  }[];
  sotpTpId: string;
}
