export const isLoginUsersListSelector = (state) => state.userStore.isLoading;
export const usersListSelector = (state) => state.userStore.users || [];

export const isLoginUsersDetailSelector = (state) =>
  state.userStore.isLoadingUserDetail;
export const UsersDetailSelector = (state) => state.userStore.userDetail || {};

export const isLoginFollowersSelector = (state) =>
  state.userStore.isLoadingFollowers;
export const UsersFollowersSelector = (state) =>
  state.userStore.followers || [];
