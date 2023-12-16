// Returns mock data for age groups
const getUserAgeGroupsStatistics = async () => {
  const mockData = [
    { name: "18-24", value: 5 },
    { name: "25-34", value: 50 },
    { name: "35-44", value: 10 },
    { name: "45-54", value: 8 },
    { name: "55+", value: 2 },
  ];

  return mockData;
};

// Returns mock review statistics for a product
const getProductReviewStatistics = async (productId) => {
  // Mock data based on product ID
  if (productId === 1) {
    return [
      { id: "1", value: "4", dateRated: "2021-01-15" },
      { id: "2", value: "5", dateRated: "2022-01-25" },
      { id: "3", value: "3", dateRated: "2023-02-05" },
      { id: "4", value: "2", dateRated: "2024-02-10" },
      { id: "5", value: "4", dateRated: "2025-04-20" },
      { id: "6", value: "4", dateRated: "2026-02-20" },
      { id: "7", value: "1", dateRated: "2027-02-20" },
      { id: "8", value: "2", dateRated: "2028-02-20" },
      { id: "9", value: "3", dateRated: "2029-02-20" },
      { id: "10", value: "5", dateRated: "2030-02-20" },
      { id: "11", value: "1", dateRated: "2031-02-22" },
      { id: "12", value: "1", dateRated: "2031-02-23" },
      // { id: "13", value: "5", dateRated: "2031-02-24" },
      // { id: "14", value: "4", dateRated: "2031-02-25" },
      // { id: "15", value: "2", dateRated: "2031-02-29" },
    ];
  } else if (productId === 2) {
    return [
      { id: "12", value: "5", dateRated: "2023-01-05" },
      { id: "13", value: "2", dateRated: "2023-01-15" },
      { id: "14", value: "3", dateRated: "2023-01-25" },
      { id: "15", value: "4", dateRated: "2023-02-05" },
      { id: "16", value: "5", dateRated: "2023-02-15" },
    ];
  } else {
    return [];
  }
};

const getBestSellersStatistics = async () => {
  return [
    { id: "1", name: "Cake with lemon", amount: "40" },
    { id: "2", name: "Cake with strawberry", amount: "10" },
    { id: "3", name: "Cake with apple", amount: "22" },
    { id: "4", name: "Raw cake", amount: "55" },
    { id: "5", name: "Lemonade", amount: "12" },
    { id: "6", name: "Cake margharita", amount: "78" },
    { id: "7", name: "Cake hazelnut", amount: "130" },
  ];
};

const getOrdersAmountStatistics = async (period) => {
  if (period === "year") {
    return [
      { year: "2020", orders: 320 },
      { year: "2021", orders: 480 },
      { year: "2022", orders: 510 },
      { year: "2023", orders: 545 },
    ];
  } else if (period === "month") {
    return [
      { month: "January", orders: 40 },
      { month: "February", orders: 35 },
      { month: "March", orders: 42 },
    ];
  } else if (period === "week") {
    return [
      { week: "Week 1", orders: 10 },
      { week: "Week 2", orders: 12 },
      { week: "Week 3", orders: 8 },
    ];
  } else if (period === "day") {
    return [
      { day: "Monday", orders: 5 },
      { day: "Tuesday", orders: 6 },
      { day: "Wednesday", orders: 7 },
    ];
  }
};

export const statisticsService = {
  getUserAgeGroupsStatistics,
  getProductReviewStatistics,
  getBestSellersStatistics,
  getOrdersAmountStatistics,
};
