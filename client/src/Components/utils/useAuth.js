import { useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";

export const getUser = async () => {
    const tokenUserLoggedIn = localStorage.getItem("token")
    const decoded = jwtDecode(tokenUserLoggedIn);
    return (decoded);
};

export function useAuth() {
    const { isLoading: isAuth, error: isAuthError, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    })

    return { isAuth, isAuthError, user }
}