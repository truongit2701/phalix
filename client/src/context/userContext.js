import React, { createContext, useState } from "react";

// Tạo UserContext
export const UserContext = createContext();

// Tạo UserProvider, là component cha bao bọc các component cần sử dụng UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm để cập nhật user
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
