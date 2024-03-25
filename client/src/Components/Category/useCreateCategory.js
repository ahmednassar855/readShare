import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


const tokenUserLoggedIn = localStorage.getItem("token")
 
export const addNewCategory = async (categoryData) => {
    const { title , desc } = categoryData
     console.log( title , desc);
    const response = await axios.post(
        "http://localhost:5000/category/",
        {title , desc},
        {
            headers: {
                authorization: `bearer ${tokenUserLoggedIn}`,
                // "Content-Type": "application/json", // Update Content-Type if not using FormData
            },
        }
    );
    const { data: responseData } = response;
    return responseData;
};

export function useCreateCategory() {
    const queryClient = useQueryClient();

    const { isLoading: isCreatingCategory, mutate: createCategory, isError: isCreateCategoryError } = useMutation({
        mutationFn: addNewCategory,
        onSuccess: () => {
            toast.success("New Category successfully created");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message)
        },
    });

    return { isCreatingCategory, createCategory, isCreateCategoryError };
}