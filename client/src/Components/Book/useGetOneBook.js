import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const tokenUserLoggedIn = localStorage.getItem("token")

export const getOneBook = async (param) => {
    let { data } = await axios.get(`http://localhost:5000/books/books/${param}`, {
        headers: {
            authorization: `bearer ${tokenUserLoggedIn}`,
        },
    });
    const { book, reviews } = data

    return { book, reviews };
};

export function useGetOneBoook() {
    const { isLoading: isGetBookLoading, error: isGetBookError, book, reviews } = useQuery({
        queryKey: ["bookReview"],
        queryFn: getOneBook,
    })

    return { isGetBookLoading, isGetBookError, book, reviews }
}