    import mongoose from "mongoose";
    import bookModel from "./bookModel.js";

    const reviewSchema = mongoose.Schema(
    {
        review: { type: String, required: [true, 'review cannot be empty'] },
        rating: {
        type: Number,
        min: [1, 'min rating is 1 '],
        max: [5, 'max rating is 5'],
        },
        createdAt: { type: Date, default: Date.now },
        book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'review must belong a book'],
        },
        user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'review must belong a user'],
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
    );

    reviewSchema.index({ user: 1, book: -1 }, { unique: true });
    reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name userPhoto',
    });
    next();
    });

    reviewSchema.statics.calcAvgRating = async function (bookId) {
        console.log("Calculating average rating for book:", bookId);
    
        const stats = await this.aggregate([
            {
                $match: { book: bookId },
            },
            {
                $group: {
                    _id: '$book',
                    nRating: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                },
            },
        ]);
    
        console.log("Stats:", stats);
    
        try {
            await bookModel.findByIdAndUpdate(bookId, {
                ratingsAverage: stats[0].avgRating,
                ratingsQuantity: stats[0].nRating,
            });
        } catch (error) {
            console.error(error);
        }
    };
    
    

    reviewSchema.post('save', async function () {
        console.log("Review saved. Calling calcAvgRating...");
        console.log("Review book ID:", this.book);
        
        const hi = await this.constructor.calcAvgRating(this.book);
        console.log(hi);
        console.log("calcAvgRating called.");
    });
    
    

    // reviewSchema.pre(/^findOneAnd/, async function (next) {
    //   this.queryObj = await this.findOne().clone();
    //   next();
    // });
    // reviewSchema.post(/^findOneAnd/, async function () {
    // await this.queryObj.constructor.calcAvgRating(this.queryObj.tour);
    // });
    const reviewModel = mongoose.model('Review', reviewSchema);

    export default reviewModel;
