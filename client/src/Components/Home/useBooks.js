import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const tokenUserLoggedIn = localStorage.getItem("token")

async function getDataFromURL() {

    let { data: allbooks } = await axios.get('http://localhost:5000/books', {
        headers: {
            authorization: `bearer ${tokenUserLoggedIn}`,
        },
    });
    const { books } = allbooks
    return books
}

export function useBooks() {
    const { isLoading, error, data: books } = useQuery({
        queryKey: ["books",],
        queryFn: getDataFromURL,
    })

    return { isLoading, error, books }
}