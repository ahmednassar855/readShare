import {   useQuery } from "@tanstack/react-query";
import axios from "axios";
 

const tokenUserLoggedIn = localStorage.getItem("token")

export const getAllReviews = async () => {
    let {data} = await axios.get('http://localhost:5000/review', {
        headers: {
            authorization: `bearer ${tokenUserLoggedIn}`,
         },
    });
    const { reviews } = data
    return(reviews);
};

export function useGetReviews() {
    const { isLoading : isReviewsLoading, error : isReviewsError, data: reviews } = useQuery({
        queryKey: ["reviews"],
        queryFn: getAllReviews,
    })

    return { isReviewsLoading, isReviewsError, reviews }
}