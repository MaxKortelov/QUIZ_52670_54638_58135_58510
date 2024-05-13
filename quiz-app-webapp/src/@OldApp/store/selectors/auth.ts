import {useTypedSelector} from "../../hooks/useTypedSelector";

export function useAuthSelectors() {
  const auth = useTypedSelector(s => s.auth);

  const user = auth.user;
  const authErrorMessage = auth.errorMessage;

  return {
    user,
    authErrorMessage
  }
}