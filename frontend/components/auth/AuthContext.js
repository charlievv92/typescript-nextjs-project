'use client';

import React, { createContext, useState, useContext, useEffect } from "react";
import { initializeSocket, disconnectSocket } from "./socket";
import { useRouter } from "next/navigation";


/*
 * 로그인상태를 전역에서 상태로 사용하기위한 컴포넌트임
 * context를사용해 관리
 *
 * 사용할곳에서는
 * import { useAuth } from '../AuthContext';
 * const { user, clientIp } = useAuth();
 * user.email, user.userName, user.authCode
 * 이렇게 현재 로그인되어있는 정보들을 가져와서 사용가능
 */


// Context 생성
const AuthContext = createContext();

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [clientIp, setClientIp] = useState("");
  const socket = initializeSocket();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const fetchStatusAndIp = async () => {
      try {
        const [statusResponse, ipResponse] = await Promise.all([
          fetch(`/api/auth/status`, { credentials: "include" }),
          fetch(`/api/auth/ip`),
        ]);

        if (!isMounted) return;

        const statusData = await statusResponse.json();
        const ipData = await ipResponse.json();

        if (statusData.user) {
          setUser(statusData.user);
        } else {
          setUser(null);
        }

        setClientIp(ipData.ip);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setUser(null);
      }
    };

    fetchStatusAndIp();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    socket.on("session-expired", () => {
      console.log("Context setUser null");
      setUser(null);
      disconnectSocket();
    });

    return () => {
      socket.off("session-expired");
    };
  }, [socket]);

  return (
    <AuthContext.Provider value={{ user, setUser, clientIp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);