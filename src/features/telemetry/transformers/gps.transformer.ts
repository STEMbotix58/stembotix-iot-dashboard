type GPSPayload = {
  latitude: number;
  longitude: number;
  timestamp: string;
};

export const transformGPSData = (payload: GPSPayload[]) => {
  return payload.map((item) => ({
    lat: item.latitude,
    lng: item.longitude,
    timestamp: item.timestamp,
  }));
};

export default transformGPSData;
