import axios from "axios";

import Swal from "sweetalert2";

export async function getLocationCoords(place) {
  const response = await axios.get(`http://api.positionstack.com/v1/forward`, {
    params: {
      access_key: process.env.REACT_APP_GEOCODE_KEY,
      query: place,
      limit: 1,
    },
  });
  const { latitude, longitude } = response.data.data[0];
  const locationData = {
    lat: latitude,
    lng: longitude,
  };
  return locationData;
}

export const fireModal = (icon, message) => {
  Swal.fire({
    icon: icon,
    text: message,
  });
};
