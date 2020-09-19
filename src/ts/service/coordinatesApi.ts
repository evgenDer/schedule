const API_KEY = '098f353529db498ba64327d93d1b0111';

export async function getAdressFromCoordinates(coords: number[]) {
  const URL = `https://api.opencagedata.com/geocode/v1/json?q=${coords[0]},${coords[1]}&key=${API_KEY}&language=ru&pretty=1`;
  const RESULT = await fetch(URL);
  const DATA = await RESULT.json();
  const ADRESS_ARRAY = DATA.results[0].formatted.split(',');
  const CITY_WITHOUT_INDEX = ADRESS_ARRAY[1].replace(/[0-9]/g, '');
  ADRESS_ARRAY[1] = CITY_WITHOUT_INDEX;
  return ADRESS_ARRAY.join(',');
}

export async function getCoordinatesFromAdress(address: string) {
  const URL = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${API_KEY}`;
  const RESULT = await fetch(URL);
  const DATA = await RESULT.json();
  const { geometry } = DATA.results[0];
  return geometry;
}
