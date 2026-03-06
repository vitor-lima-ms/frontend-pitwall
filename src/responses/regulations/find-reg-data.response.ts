/* FindRegulationData */
export default interface FindRegulationData {
  regId: string;
  regIdentifier: string;
  regPublicationDate: string;
  regPub: {
    pubAcronym: string;
    pubId: string;
    pubName: string;
  };
}
