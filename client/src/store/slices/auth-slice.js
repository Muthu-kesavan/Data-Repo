export const createAuthSlice = (set) => ({
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null, // Initialize from localStorage if available
  setUserInfo: (userInfo) => {
    set({ userInfo }); // Set the userInfo in the Zustand store
    localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Persist userInfo in localStorage
  },
  clearUserInfo: () => {
    set({ userInfo: null }); // Clear userInfo from the Zustand store
    localStorage.removeItem("userInfo"); // Remove userInfo from localStorage
  },
});
