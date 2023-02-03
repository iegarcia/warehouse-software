import axios from "axios";

import Swal from "sweetalert2";

export async function getLocationData(place) {
  const response = await axios.get(`http://api.positionstack.com/v1/forward`, {
    params: {
      access_key: "9bc7c52f32a267ebc3d2244430a1e598",
      query: place,
      limit: 1,
    },
  });
  return response.data;
}
export async function getLocationCoords(place) {
  const response = await axios.get(`http://api.positionstack.com/v1/forward`, {
    params: {
      access_key: "9bc7c52f32a267ebc3d2244430a1e598",
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
