import React, { useState } from 'react';

const RetreatForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    features: '',
    styles: '',
    skillLevel: '',
    benefits: '',
    program: '',
    instructors: '',
    images: [], // For file uploads
    price: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('location', formData.location);
    form.append('description', formData.description);
    form.append('features', formData.features);
    form.append('styles', formData.styles);
    form.append('skillLevel', formData.skillLevel);
    form.append('benefits', formData.benefits);
    form.append('program', formData.program);
    form.append('price', formData.price);

    formData.images.forEach((file) => {
      form.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/v1/createretreat', {
        method: 'POST',
        body: form
      });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

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
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Features (comma-separated):
            <input type="text" name="features" value={formData.features} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Styles (comma-separated):
            <input type="text" name="styles" value={formData.styles} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Skill Level (comma-separated):
            <input type="text" name="skillLevel" value={formData.skillLevel} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Benefits (comma-separated):
            <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Program (comma-separated):
            <input type="text" name="program" value={formData.program} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Instructors (comma-separated IDs):
            <input type="text" name="instructors" value={formData.instructors} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Images:
            <input type="file" name="images" multiple onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleChange} />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RetreatForm;