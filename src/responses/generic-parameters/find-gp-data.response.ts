/* FindGenericParameterData */
export default interface FindGenericParameterData {
  gpId: string;
  gpName: string;
  gpQsfgps: {
    qsfgpEm: {
      emId: string;
      emName: string;
    };
    qsfgpEmParticularity: null | string;
    qsfgpId: string;
    qsfgpMaxValue: null | number;
    qsfgpMinValue: null | number;
    qsfgpReg: {
      regId: string;
      regIdentifier: string;
      regPublicationDate: string;
      regPub: {
        pubAcronym: string;
        pubId: string;
        pubName: string;
      };
    };
    qsfgpUn: {
      unId: string;
      unName: string;
    };
  }[];
}
