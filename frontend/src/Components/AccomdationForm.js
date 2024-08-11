import React, { useState } from 'react';

const AccommodationForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    price: '',
    shared: false,
    amenities: [], 
    images: [],
    retreatcenter: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle amenities input change
  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      amenities: value.split(',').map(item => item.trim())
    });
  };

  // Handle file input changes for images
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
    form.append('type', formData.type);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('shared', formData.shared);
    form.append('retreatcenter', formData.retreatcenter);

    formData.amenities.forEach((amenity, index) => {
      form.append(`amenities[${index}]`, amenity);
    });

    formData.images.forEach((file) => {
      form.append('images', file);
    });
    try {
      const response = await fetch('http://localhost:5000/api/v1/createaccomodation', {
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
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Shared:
            <input type="checkbox" name="shared" checked={formData.shared} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Amenities (comma separated):
            <input type="text" name="amenities" value={formData.amenities.join(', ')} onChange={handleAmenitiesChange} required />
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
            Retreat Center ID:
            <input type="text" name="retreatcenter" value={formData.retreatcenter} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <button type="submit" >Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AccommodationForm;