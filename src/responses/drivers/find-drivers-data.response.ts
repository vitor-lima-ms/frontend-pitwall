/* FindDriversData */
export default interface FindDriversData {
  MRData: {
    DriverTable: {
      Drivers: {
        code: string;
        dateOfBirth: string;
        driverId: string;
        familyName: string;
        givenName: string;
        nationality: string;
        permanentNumber: string;
        url: string;
      }[];
      season: string;
    };
    limit: string;
    offset: string;
    series: string;
    total: string;
    url: string;
    xmlns: string;
  };
}
