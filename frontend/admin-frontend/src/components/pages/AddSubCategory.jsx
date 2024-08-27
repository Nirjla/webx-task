import { useState } from "react";
import { useCreateSubCategoryMutation, useGetCategoriesQuery } from "../../api/productsApi";
import MainLayout from "../../layout/MainLayout";
import FormWrapper from "../common/FormWrapper";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import PrimaryHeadline from "../common/PrimaryHeadline";
import SelectField from "../common/SelectField";
import TextField from "../common/TextField";
import toast from "react-hot-toast";

export default function AddSubCategory() {
      const [createSubCategory] = useCreateSubCategoryMutation();
      const [formData, setFormData] = useState({
            name: '',
            description: '',
            category: ''
      });
      const [err, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const { data: categories = [], isLoading, error } = useGetCategoriesQuery();


      const handleInputChange = (e) => {
            const { name, value } = e.target;
            console.log(`Updating ${name} to ${value}`); 
            setFormData(prevData => ({
                  ...prevData,
                  [name]: value
            }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  console.log('FormData', formData)
                  await createSubCategory(formData).unwrap();
                  setFormData({
                        name: '',
                        description: '',
                        category: ''
                  });
                  toast.success("SubCategory Added Successfully");
            } catch (e) {
                  console.error("Error adding sub-category:", e.message);
                  toast.error('Failed to create sub-category. Please try again.');
            }
      };



      if (isLoading) {
            return <p>Loading...</p>;
      }

      if (error) {
            return <p>Error fetching categories: {error.message}</p>;
      }

      return (
            <MainLayout>
                  <PrimaryHeadline title={'Add a sub-category'} />
                  <FormWrapper onSubmit={handleSubmit}>
                        <InputField
                              name={'name'}
                              title={'Sub-category'}
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                        />
                        <TextField
                              name='description'
                              title='Description'
                              value={formData.description}
                              onChange={handleInputChange}
                        />
                        <SelectField
                              name={'category'}
                              title={'Choose a Category'}
                              data={categories}
                              value={formData.category}
                              onChange={handleInputChange}
                        />
                        <PrimaryButton type="submit">Add Sub-Category</PrimaryButton>
                        {err && <p className="text-red-500 mb-4">{err}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                  </FormWrapper>
            </MainLayout>
      );
}
