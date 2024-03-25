import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


const tokenUserLoggedIn = localStorage.getItem("token")
 
export const getOneBookById = async (param) => {
      let {data} = await axios.get(`http://localhost:5000/books/books/${param.id}`, {
          headers: {
              authorization: `bearer ${tokenUserLoggedIn}`,
           },
      });
      const { book , reviews} = data
       return {book , reviews};
  };
  

export function useGetBookById() {
    const queryClient = useQueryClient();
    const { isLoading: isGettingBookByIdLoading, mutate: gettingBookById, isError: isGettingBookByIdError } = useMutation({
        mutationFn: getOneBookById,
        onSuccess: () => {
            toast.success("Get A book Successfully");
            queryClient.invalidateQueries({ queryKey: ["book"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message)
        },
    });

    return { isGettingBookByIdLoading, gettingBookById, isGettingBookByIdError };
}