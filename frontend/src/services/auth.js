export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
};
