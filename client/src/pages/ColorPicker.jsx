import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '../components';

const AddCourseForm = ({ onClose }) => {
  const [course, setCourse] = useState('');
  const [teacher, setTeacher] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('course', course);
    formData.append('teacher', teacher);
    formData.append('link', link);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Send form data to the server
      const response = await axios.post('http://localhost:8000/api/v1/users/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Course added:', response.data);
      // Handle success, e.g., show a success message or reset form

      // Close the form after successful submission
      onClose();
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Course Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teacher</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Link</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Course
            </button>
            <button type="button" className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ColorPicker = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <Header category="App" title="Courses" />
      <div className="absolute top-4 right-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setIsFormOpen(true)}
        >
          Add Course
        </button>
      </div>
      {isFormOpen && <AddCourseForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default ColorPicker;
