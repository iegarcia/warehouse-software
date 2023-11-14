import axios from "axios";

import Swal from "sweetalert2";

export const getLocationCoords = async (place) => {
  //Codificar nombre para ebitar errores
  const encodedPlace = encodeURIComponent(place);

  const response = await axios.get(
    `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_GEOCODE_KEY}&q=${encodedPlace}&limit=1&format=json`
  );

  const locationData = {
    lng: parseFloat(response.data[0].lon),
    lat: parseFloat(response.data[0].lat),
  };

  return locationData;
};

export const getDistance = async (origin, destinations) => {
  const dCoords = destinations.map((d) => Object.values(d));
  const oCoords = Object.values(origin);
  const locations = [oCoords, ...dCoords];
  const data = {
    sources: [0],
    locations: locations,
    metrics: ["distance"],
    units: "m",
  };
  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/matrix/driving-car",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTE_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const buildRoute = async (origin, destination) => {
  try {
    const response = await axios.get(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        params: {
          api_key: process.env.REACT_APP_OPENROUTE_KEY,
          start: String(origin),
          end: String(destination),
        },
      }
    );
    const { coordinates } = response.data.features[0].geometry;
    const { steps } = response.data.features[0].properties.segments[0];
    const directionsData = {
      coordinates,
      steps,
    };
    return directionsData;
  } catch (error) {
    console.log(error);
  }
};

export const fireModal = (icon, message) => {
  Swal.fire({
    icon: icon,
    text: message,
  });
};

export const filterDistances = (destinations, distances) => {
  let nearestWarehouses = {};
  const maxDistance = 5000; //Distancia maxima

  //Filtrar resultados y obtener los menores a la distancia maxima
  for (let i = 0; i < destinations.length; i++) {
    for (let j = 0; j < distances[0].length; j++) {
      if (distances[i] != undefined && distances[i][j] < maxDistance) {
        let location = destinations[j].location;

        if (!nearestWarehouses.hasOwnProperty(j)) {
          nearestWarehouses[j] = {
            distance: distances[i][j],
            coords: { lat: location[1], lng: location[0] },
          };
        }
      }
    }
  }
  return nearestWarehouses;
};
