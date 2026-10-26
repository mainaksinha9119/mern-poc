import api from "../api/simple";

const normalizeCredentials = (dataOrEmail, password) => {
  if (dataOrEmail && typeof dataOrEmail === "object") {
    return {
      email: dataOrEmail.email,
      password: dataOrEmail.password,
    };
  }

  return {
    email: dataOrEmail,
    password,
  };
};

const fetchSession = () => api.get("/mySession");
const signIn = (emailOrData, password) => api.post("/signIn", normalizeCredentials(emailOrData, password));
const login = (emailOrData, password) => api.post("/auth/login", normalizeCredentials(emailOrData, password));
const register = (data) => api.post("/auth/register", data);

export default { fetchSession, signIn, register, login };