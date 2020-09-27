const API_KEY = '098f353529db498ba64327d93d1b0111';

export async function getAdressFromCoordinates(coords: number[]) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords[0]},${coords[1]}&key=${API_KEY}&language=ru&pretty=1`;
    const result = await fetch(url);
    const data = await result.json();
    const adressArray = data.results[0].formatted.split(',');
    const cityWithoutIndex = adressArray[1].replace(/[0-9]/g, '');
    adressArray[1] = cityWithoutIndex;
    return adressArray.join(',');
  } catch (err) {
    return err;
  }
}

export async function getCoordinatesFromAdress(address: string) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${API_KEY}`;
    const result = await fetch(url);
    const data = await result.json();
    const { geometry } = data.results[0];
    return geometry;
  } catch (err) {
    return err;
  }
}
