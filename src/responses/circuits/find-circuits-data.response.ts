/* FindCircuitsData */
export default interface FindCircuitsData {
  MRData: {
    CircuitTable: {
      Circuits: {
        circuitId: string;
        circuitName: string;
        Location: {
          country: string;
          lat: string;
          locality: string;
          long: string;
        };
        url: string;
      }[];
    };
    limit: string;
    offset: string;
    series: string;
    total: string;
    url: string;
    xmlns: string;
  };
}
