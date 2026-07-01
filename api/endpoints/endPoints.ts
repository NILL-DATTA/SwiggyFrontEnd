
export const endPoints = {
  auth: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    otp: "/auth/otp",
  },

  restaurant: {
    applyRestaurant: "/auth/apply/restaurant",
    verifyOtp: "/restaurant/otp",
    restaurantDetails: "/restaurant/details",
    restaurantDoc: "/restaurant/documents",
    restaurantMenu: "/restaurants/menu",
    restaurantContract: "/partner-contract",
    addmenu: "/add-food"
  },
};

const endPointsUrl = [
  endPoints.auth.signIn,
  endPoints.auth.signUp,
  endPoints.auth.otp,
  endPoints.restaurant.applyRestaurant,
  endPoints.restaurant.verifyOtp,
  endPoints.restaurant.restaurantDetails,
  endPoints.restaurant.restaurantDoc,
  endPoints.restaurant.restaurantMenu,
  endPoints.restaurant.restaurantContract,
  endPoints.restaurant.addmenu,
];
