const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      localStorage.removeItem("user");
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "FOLLOW":
      const updatedFollowings = state.user.followings
        ? [...state.user.followings, action.payload]
        : [action.payload];
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, followings: updatedFollowings })
      );
      return {
        ...state,
        user: {
          ...state.user,
          followings: updatedFollowings,
        },
      };
    case "UNFOLLOW":
      const filteredFollowings = state.user.followings
        ? state.user.followings.filter(
            (following) => following !== action.payload
          )
        : [];
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, followings: filteredFollowings })
      );
      return {
        ...state,
        user: {
          ...state.user,
          followings: filteredFollowings,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
