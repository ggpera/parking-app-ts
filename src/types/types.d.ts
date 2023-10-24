interface Coordinate {
  lat: number;
  lng: number;
}
interface PolygonType {
  _id: number;
  KOHDETYYPPI: string;
}

interface Root {
  help: string;
  success: boolean;
  result: Result;
}

interface Result {
  include_total: boolean;
  limit: number;
  records_format: string;
  resource_id: string;
  total_estimation_threshold: number;
  records: Record[];
  total: number;
  total_was_estimated: boolean;
}

interface Record {
  _id: number;
  FID: string;
  ALUEEN_NUMERO: number;
  KOHDETYYPPI: string;
  PAIKKOJEN_LUKUMÄÄRÄ: number;
  RAJOITUSTYYPPI: string;
  YÖPYSÄKÖINTIKIELTO: string;
  HINTA?: number;
  SUURIN_SALLITTU_PYSÄKÖINTIAIKA?: number;
  RAJOITUSAIKA_ALKAA_ARK?: number;
  RAJOITUSAIKA_PÄÄTTYY_ARK?: number;
  RAJOITUSAIKA_ALKAA_LA?: number;
  RAJOITUSAIKA_PÄÄTTYY_LA?: number;
  RAJOITUSAIKA_ALKAA_SU?: number;
  RAJOITUSAIKA_PÄÄTTYY_SU?: number;
  ASUKASPYSÄKÖINTI: string;
  TALVIKUNNOSSAPITO: string;
  MAKSUVYÖHYKE?: number;
  GEOLOC: string;
}
