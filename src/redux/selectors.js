//Selectors for App
export const requestInitialized = state => state.app.initialized;
//Selectors for UsersPage
export const requestUsers = state => state.usersPage.users;
export const requestCurrentPage = state => state.usersPage.currentPage;
export const requestTotalUsers = state => state.usersPage.totalUsers;
export const requestPageSize = state => state.usersPage.pageSize;
export const requestIsFetching = state => state.usersPage.isFetching;
export const requestFollowingInProgress = state => state.usersPage.followingInProgress;
export const requestPortionSize = state => state.usersPage.portionSize;
//Selectors for AuthTemplate
export const requestIsAuth = state => state.authTemplate.isAuth;
export const requestLogin = state => state.authTemplate.login;
export const requestAuthId = state => state.authTemplate.id;

//Selectors for ProfilePage
export const requestUserProfile = state => state.profilePage.userProfile;
export const requestStatus = state => state.profilePage.status;
export const requestPosts = state => state.profilePage.posts;

//Selectors for DialogsPage
export const requestDialogsPage = state => state.dialogsPage;



