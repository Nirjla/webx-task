import { useState } from "react";
import { useCreateCategoryMutation } from "../../api/productsApi";
import MainLayout from "../../layout/MainLayout";
import FormWrapper from "../common/FormWrapper";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import PrimaryHeadline from "../common/PrimaryHeadline";
import TextField from "../common/TextField";

export default function AddCategory() {
      const [createCategory] = useCreateCategoryMutation();
      const [formData, setFormData] = useState({
            name: '',
            description: ''
      })
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const handleInputChange = async(e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value
            })
      }

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  console.log("FormdataCat", formData)
                  await createCategory(formData).unwrap();
                  setFormData({
                        name:'',
                        description:''
                  })
                  setSuccessMessage("Category Added Successfully")
            } catch (e) {
                  console.error("Error adding category:", e.message)
                  setError('Failed to create category. Please try again.');

            }
      }
      return (<>
            <MainLayout>
                  <PrimaryHeadline title={'Add a category'} />
                  <FormWrapper onSubmit={handleSubmit}>
                        <InputField name={'name'} title={'Category'} type="text" value={formData.name} onChange={handleInputChange} />
                        <TextField name='description' title='Description' value={formData.description} onChange={handleInputChange} />
                        <PrimaryButton />
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                  </FormWrapper>
            </MainLayout>
      </>)
}