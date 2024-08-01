import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function UploadResourceModal({ isOpen, onClose, onUpload }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects');
        if (response.ok) {
          const data = await response.json();
          setSubjects(data);
        } else {
          setError('Failed to load subjects');
        }
      } catch (error) {
        setError('Failed to load subjects');
      }
    };

    fetchSubjects();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !selectedSubject) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('subject', selectedSubject);
    formData.append('file', file);

    try {
      const response = await fetch('/api/library', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to upload resource');
      }

      onUpload(responseData);
      onClose();
    } catch (error) {
      setError(`Upload error: ${error.message}`);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Upload Resource</h2>
          {error && (
            <div className="text-red-600 mb-4">
              <strong>{error}</strong>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-1">
                Subject
              </label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 font-semibold mb-1">
                File
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
