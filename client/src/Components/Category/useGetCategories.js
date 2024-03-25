import {   useQuery } from "@tanstack/react-query";
import axios from "axios";
 

const tokenUserLoggedIn = localStorage.getItem("token")

export const getAllCategories = async () => {
    let {data} = await axios.get('http://localhost:5000/category', {
        headers: {
            authorization: `bearer ${tokenUserLoggedIn}`,
         },
    });
    const { categories } = data
    return(categories);
};

export function useGetCategories() {
    const { isLoading : isCategoriesLoading, error : isCategoriesError, data: categories } = useQuery({
        queryKey: ["categories",],
        queryFn: getAllCategories,
    })

    return { isCategoriesLoading, isCategoriesError, categories }
}