//Taylor Zweigle, 2024
import * as Actions from "../actions/actions";

import { useAuthContext } from "./useAuthContext";
import { useRestaurantsContext } from "./useRestaurantsContext";

export const useLogout = () => {
  const { dispatchAuth } = useAuthContext();
  const { dispatchRestaurants } = useRestaurantsContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatchAuth({ type: Actions.LOGOUT });
    dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: [] });
  };

  return { logout };
};
