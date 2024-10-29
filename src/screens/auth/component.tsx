import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActionButton from "../../components/buttons/action";
import Page from "../../components/page";
import { AuthScreenProps } from "./types";
import { service } from "../../service";
import { useAuthStore } from "../../store";

const AuthScreen = (props: AuthScreenProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const setHasAccessToken = useAuthStore((state) => state.setHasAccessToken);

  const onAuthenticate = useCallback(async () => {
    const searchParams = new URLSearchParams(location.search);
    const urlError = searchParams.get("error");
    const urlCode = searchParams.get("code");
    const urlState = searchParams.get("state");
    const storedState = localStorage.getItem("state");

    setAuthError("");
    if (urlError) {
      setAuthError("User didn't authorize app.");
    } else if (storedState !== urlState) {
      setAuthError("An error has occured. Please try again.");
    } else if (urlCode) {
      try {
        setIsAuthenticating(true);
        await service.auth.getAccessToken(urlCode);
        setHasAccessToken();
        navigate("/", { replace: true });
      } catch (error) {
        setAuthError("An error has occured. Please try again.");
        console.error(error);
      } finally {
        setIsAuthenticating(false);
      }
    }
  }, [location.search, navigate, setHasAccessToken]);

  useEffect(() => {
    onAuthenticate();
  }, [location, onAuthenticate]);

  const onGetCode = () => {
    service.auth.getCode();
  };

  return (
    <Page>
      <ActionButton
        title="AUTHORIZE ACCESS"
        onClick={onGetCode}
        isLoading={isAuthenticating}
        error={authError}
      />
    </Page>
  );
};

export default AuthScreen;
