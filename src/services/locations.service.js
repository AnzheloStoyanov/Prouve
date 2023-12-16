 import Api from "src/core/api";

 //Uncoment when server ready
// const getAllLocations = async () => {
//   const response = await Api.get("/location/getall");
//   return response;
// };

// const getLocationById = async (id) => {
//   const response = await Api.get(`/location/getbyid/${id}`);
//   return response;
// };

// const deleteLocation = async (id) => {
//   const response = await Api.delete(`/location/delete/${id}`);
//   return response;
// };

// const upsertLocation = async (location) => {
//   const response = await Api.post("/location/upsert", location);
//   return response;
// };

// export const locationsService = {
//   getAllLocations,
//   getLocationById,
//   deleteLocation,
//   upsertLocation,
// };


// Mock data for the locations
const locationsMockData = [
    { id: 1, address: "1234 Elm St, Springfield", googleMapsLink: "https://maps.google.com/?q=1234+Elm+St,+Springfield" },
    { id: 2, address: "5678 Oak Rd, Shelbyville", googleMapsLink: "https://maps.google.com/?q=5678+Oak+Rd,+Shelbyville" }
  ];
  
  const getAllLocations = async () => {
    // Mocking the response
    return locationsMockData;
  };
  
  const getLocationById = async (id) => {
    // Mocking the response
    return locationsMockData.find(location => location.id === id);
  };
  
  const deleteLocation = async (id) => {
    // Mocking the deletion
    const index = locationsMockData.findIndex(location => location.id === id);
    if (index !== -1) {
      locationsMockData.splice(index, 1);
    }
    return { success: true }; // mock successful deletion response
  };
  
  const upsertLocation = async (location) => {
    // Mocking the upsert (insert/update)
    const existingLocation = locationsMockData.find(l => l.id === location.id);
    if (existingLocation) {
      // Update
      Object.assign(existingLocation, location);
    } else {
      // Insert
      locationsMockData.push({ ...location, id: Math.max(...locationsMockData.map(l => l.id)) + 1 });
    }
    return location;
  };
  
  export const locationsService = {
    getAllLocations,
    getLocationById,
    deleteLocation,
    upsertLocation,
  };
  