// users.service.js
import Api from "src/core/api";

const mapServerResponseToClient = (serverData) => {
  return {
    id: serverData?.id ?? null,
    name: serverData?.name ?? null,
    email: serverData?.email ?? null,
    dob: serverData?.dateOfBirth?.split('T')[0] ?? null,
    qrCode: null,
    gender: serverData?.gender?.toLowerCase() ?? null,
    phone: serverData?.phoneNumber ?? null,
    address: serverData?.savedOrderAddress ?? null,
    onlineExpense: serverData?.totalExpenseOnline ?? null,
    onSpotExpense: serverData?.totalExpenseOnSpot ?? null,
    isEnabled: serverData?.lockoutEnd === null,
    role: serverData?.roleId
  };
};

const getAllUsers = async () => {
  const response = await Api.get("/userManagement/getAllUsers");
  const mappedResponse = response.map(user => mapServerResponseToClient(user));
  return mappedResponse;
};

const getUserById = async (id) => {
  const response = await Api.get(`/user/getbyid/${id}`);
  return response;
};

const toggleUserStatus = async (id, action) => {
  const endpoint = action === 'suspend' ? `/user/suspend/${id}` : `/user/enable/${id}`;
  const response = await Api.post(endpoint);
  return response;
};

const upsertUser = async (user) => {
  const response = await Api.post("/user/upsert", user);
  return response;
};

const getUserNames = async () => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
};

const changeUserRole = async (userId, newRole) => {
  const response = await Api.post(`/authentication/changeUserRole`, {
    userId: userId.toString(),
    roleId: newRole.toString()
  });
  return response;
};
const getUserAllergen = async (id) => {
  const response = await Api.get(`/UserAllergen/GetAllergensForUser?userId=${id}`);
  return response;
};


const updatePersonalData = async (data) => {
  const response = await Api.post(`/userprofile/updateprofile`, data);
  return response;
};


export const usersService = {
  getAllUsers,
  getUserById,
  toggleUserStatus,
  upsertUser,
  getUserNames,
  changeUserRole,
};
