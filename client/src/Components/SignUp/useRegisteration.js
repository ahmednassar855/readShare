import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


 
export const addNewUser = async (userData) => {
     console.log(userData);
    const response = await axios.post(
        "http://localhost:5000/users/signup",
        userData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    );
    const { data: responseData } = response;
    return responseData;
};

export function useRegisteration() {
    const queryClient = useQueryClient();

    const { isLoading: isCreatingUser, mutate: createUser, isError: isCreateUserError } = useMutation({
        mutationFn: addNewUser,
        onSuccess: () => {
            toast.success("Regiseration successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message)
        },
    });

    return { isCreatingUser, createUser, isCreateUserError };
}