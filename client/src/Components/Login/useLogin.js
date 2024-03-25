import axios from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import jwtDecode from "jwt-decode";

export const loginApi = async (userData) => {
    try {
        const response = await axios.post("http://localhost:5000/users/login", userData);
        console.log(response);
        const data = response.data;
        if (data.status === "success") {
            localStorage.setItem("token", data.token);
            const decoded = jwtDecode(data.token);
            return { token: data.token, decoded }; // Indicate successful login
        } else {
            throw new Error(data.message); // Throw an error for unsuccessful login
        }
    } catch (error) {
        throw error; // Throw any other network or server errors
    }
}

export function useLogin() {
    const queryClient = useQueryClient();
    const { isLoading: isLoggedIn, mutate: loggedIn, isError: isLoggedInError } = useMutation({
        mutationFn: loginApi,
        onSuccess: () => {
            toast.success("Logged in Successfully");
        },
        onError: (err) => toast.error(err.response.data.message),
    })

    return { isLoggedIn, loggedIn, isLoggedInError }
}