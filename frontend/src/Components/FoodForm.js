import React, { useState } from 'react';

const FoodForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    images: [],
    retreatcenter: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('type', formData.type);
    form.append('description', formData.description);
    form.append('retreatcenter', formData.retreatcenter);  

    formData.images.forEach((file) => {
      form.append('images', file);  
    });

    try {
      const response = await fetch('http://localhost:5000/api/v1/createfood', {
        method: 'POST',
        body: form
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Type:
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Photos:
            <input type="file" name="images" multiple onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Retreat Center ID:
            <input type="text" name="retreatcenter" value={formData.retreatcenter} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;