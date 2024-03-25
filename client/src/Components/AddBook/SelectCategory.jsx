import React from "react";
import { useGetCategories } from "../Category/useGetCategories";

const SelectCategory = ({register , categories , isCategoriesLoading}) => {
 
   return (
    <select className="form-select" aria-label="Default select example"  {...register("category", { required: "This field is required" })}>
      <option selected disabled={isCategoriesLoading}>Open this select menu</option>

      {categories?.map((category, index) => (
        <option  key={category._id}  value={category._id}>{category.title}</option>
      ))}
    </select>
  );
};

export default SelectCategory;
