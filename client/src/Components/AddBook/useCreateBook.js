import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


const tokenUserLoggedIn = localStorage.getItem("token")
 
export const addNewBook = async (data) => {
    const response = await axios.post(
        "http://localhost:5000/books/",
        data, // Use FormData object instead of spreading data
        {
            headers: {
                authorization: `bearer ${tokenUserLoggedIn}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );
    const { data: responseData } = response;
    return responseData;

};


export function useCreateBook() {
    const queryClient = useQueryClient();
    const { isLoading: isCreating, mutate: createBook, isError: isAddBookError } = useMutation({
        mutationFn: addNewBook,
        onSuccess: () => {
            toast.success("New Book successfully created");
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
        onError: (err) => toast.error(err.response.data.message),
    });

    return { isCreating, createBook, isAddBookError };
}