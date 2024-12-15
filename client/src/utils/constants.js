export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const REGISTER_ROUTE =`${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const REFRESH_ROUTE = `/refresh`;

export const PROJECT_ROUTES = "api/admin/project";
export const CREATE_PROJECT_ROUTE = `${PROJECT_ROUTES}/create`;
export const ASSIGN_MANAGER_ROUTE = (projectId, managerId) =>
  `${PROJECT_ROUTES}/${projectId}/assign/${managerId}`;

export const GET_MANAGER_ROUTE = `${PROJECT_ROUTES}/managers`;
export const GET_ASSIGNED_PROJECTS_ROUTE = (managerId) => `${PROJECT_ROUTES}/manager/${managerId}`;

