import mongoose from 'mongoose';
import reviewModel from '../../../database/models/reviewModel.js';
import AppErr from '../../error/AppErr.js';

// Create operation
export const createReview = async (req, res, next) => {
    const { review, rating, book } = req.body;
    try {
        const user= req.user.id;
        const isAllowed = await reviewModel.findOne({book , user })
        if(isAllowed)  return next(new AppErr("your review is already exist", 404));
        const newReview = await reviewModel.create({ review, rating, book, user });
        if(!newReview) return next(new AppErr("error creating review", 400));
        res.status(201).json({ status: 'success', newReview });
    } catch (error) {
        console.log(error);
        return next(new AppErr("error creating review", 400));
    }
};

// Read operation
export const getReviewById = async (req, res, next) => {
    let reviewId = req.params.id;
    reviewId = new mongoose.Types.ObjectId(reviewId)

    try {
        const review = await reviewModel.findById(reviewId).populate('user', 'name userPhoto').exec();
        if (!review) return next(new AppErr("No review found", 404));
        res.status(200).json({ status: 'success', review });
    } catch (error) {
        return next(new AppErr("Error fetching review", 400));
    }
};

// Update operation
export const updateReview = async (req, res, next) => {
    let reviewId = req.params.id;
    reviewId = new mongoose.Types.ObjectId(reviewId)
     const user= req.user.id;
     const isAllowed = await reviewModel.findOne({_id :reviewId , user })
    if(!isAllowed)  return next(new AppErr("you are not allowed to edit this review or the review is deleted", 404));
    const { review } = req.body;
    try {
        if(!review ) return next(new AppErr("please put the review text and the rating  ", 404));
        const updatedReview = await reviewModel.findById(reviewId)
        if (!updatedReview) return next(new AppErr("No review found", 404));
        await reviewModel.findByIdAndUpdate(reviewId , { review})
        res.status(200).json({ status: 'success', review: updatedReview });
    } catch (error) {
        console.log(error);
        return next(new AppErr("Error updating review", 400));
    }
};

// Delete operation
export const deleteReview = async (req, res, next) => {
    let reviewId = req.params.id;
    // reviewId = new mongoose.Types.ObjectId(reviewId)
    console.log(reviewId);
    const user= req.user.id;
    if(req.user.role ="user"){
        const isAllowed = await reviewModel.findOne({_id :reviewId , user })
        if(!isAllowed)  return next(new AppErr("You are not allowed to delete", 401));
    }
    try {
        const deletedReview = await reviewModel.findByIdAndDelete(reviewId);
        console.log('sssssssssssssssssssssssssss');
        if (!deletedReview) return next(new AppErr("No review found", 404));
        res.status(200).json({ status: 'success', message: 'Review deleted successfully' });
    } catch (error) {
        return next(new AppErr("Error deleting review", 400));
    }
};

// // Get all reviews
// export const getAllReviews = async (req, res, next) => {
//     try {
//         const reviews = await reviewModel.find().populate('user', 'name').exec();
//         if (!reviews.length) return next(new AppErr("No reviews found", 404));
//         res.status(200).json({ status: 'success', reviews });
//     } catch (error) {
//         return next(new AppErr("Error fetching reviews", 400));
//     }
// };
