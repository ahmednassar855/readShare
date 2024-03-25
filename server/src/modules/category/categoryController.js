import categoryModel from '../../../database/models/category.js';
import AppErr from '../../error/AppErr.js';

// Create operation
export const createCategory = async (req, res, next) => {
    const { title, desc } = req.body;
    const isExist = await categoryModel.findOne({ title });
    if(isExist) return next(new AppErr("category is already exist" , 400))
    const category = await categoryModel.create({ title, desc });
    if(!category) return next(new AppErr("error creating category" , 400))
    res.status(201).json({ status: 'success',  category });
};

// Read operation
export const getCategoryById = async (req, res, next) => {

    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if (!category) return next(new AppErr("no category found" , 400))
    res.status(200).json({ status: 'success',  category });

};

// Update operation
export const updateCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    const { desc } = req.body;
    const isExist = await categoryModel.findById(categoryId);
    if(!isExist) return next(new AppErr("category is not found" , 400))
    const category = await categoryModel.findByIdAndUpdate(
      categoryId,
      { desc },
      { new: true }
    );
    if (!category) return next(new AppErr("no category found" , 400))
    res.status(200).json({ status: 'success',  category });
};

// Delete operation
export const deleteCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    if (!category) return next(new AppErr("no category found" , 400))
    res.status(200).json({ status: 'success', message: 'Category deleted successfully' });
};



export const getAllCategories = async (req, res, next) => {
      const categories = await categoryModel.find();
      if (!categories.length) return next(new AppErr("no category found" , 400))
      res.status(200).json({ status: 'success',  categories });
  };