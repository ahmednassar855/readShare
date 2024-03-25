import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const tokenUserLoggedIn = localStorage.getItem("token")

export const addNewReview = async (reviewData) => {
    console.log(reviewData);
    const response = await axios.post(
        "http://localhost:5000/review/",
        reviewData,
        {
            headers: {
                authorization: `bearer ${tokenUserLoggedIn}`,
            },
        }
    );
    const { data: responseData } = response;
    return responseData;
};

export function useCreateReview() {
    const queryClient = useQueryClient();

    const { isLoading: isCreatingReview, mutate: createReview, isError: isCreateReviewError } = useMutation({
        mutationFn: addNewReview,
        onSuccess: () => {
            toast.success("New Review successfully created");
            queryClient.invalidateQueries({ queryKey: ["bookReview"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message)
        },
    });

    return { isCreatingReview, createReview, isCreateReviewError };
}