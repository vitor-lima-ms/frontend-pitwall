/* FindConstructorsData */
export default interface FindConstructorsData {
  MRData: {
    ConstructorTable: {
      Constructors: {
        constructorId: string;
        name: string;
        nationality: string;
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
