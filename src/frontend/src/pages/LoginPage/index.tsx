import { useLoginUser } from "@/controllers/API/queries/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import useAlertStore from "@/stores/alertStore";
import { SIGNIN_ERROR_ALERT } from "@/constants/alerts_constants";
import { LoginType } from "@/types/api";

export default function LoginPage(): JSX.Element {
  const query = new URLSearchParams(window.location.search);
  const alphaNum: string | null = query.get("alphaNumeric");

  const { login } = useContext(AuthContext);
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const { mutate, isLoading } = useLoginUser();

  useEffect(() => {
    if (!alphaNum) {
      setErrorData({
        title: SIGNIN_ERROR_ALERT,
        list: ["Missing login token."],
      });
      return;
    }

    const user: LoginType = {
      username: alphaNum.trim(),
    };

    mutate(user, {
      onSuccess: (data) => {
        login(data.access_token, "login", data.refresh_token);
      },
      onError: (error) => {
        setErrorData({
          title: SIGNIN_ERROR_ALERT,
          list: [error?.response?.data?.detail || "Login failed."],
        });
      },
    });
  }, [alphaNum, mutate, login, setErrorData]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold text-primary">
          {isLoading
            ? "Signing you in securely..."
            : "Preparing login..."}
        </h2>
        {!alphaNum && (
          <p className="text-sm text-destructive">
            No login token found in the URL.
          </p>
        )}
      </div>
    </div>
  );
}

