"use client";
import React, { useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Select from 'react-select';

export default function ProblemAdd() {
  const [formData, setFormData] = useState({
    name: '',
    difficulty: 'Easy',
    problemStatement: '',
    constraints: '',
    testCases: '',
    tags: '',
  });
  const tagOptions = [
    { value: 'array', label: 'Array' },
    { value: 'sorting', label: 'Sorting' },
    { value: 'dynamic programming', label: 'Dynamic Programming' },
    { value: 'graph', label: 'Graph' },
    { value: 'string', label: 'String' },
    { value: 'tree', label: 'Tree' },
    { value: 'two pointer', label: 'Two Pointer' },
    { value: 'linked list', label: 'Linked List' },
    // Add more tag options as needed
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleTagsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      tags: selectedOptions.map(option => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "problems"), formData);
      console.log("Document written with ID: ", docRef.id);
      // Optionally, reset form after submission
      setFormData({
        name: '',
        difficulty: 'Easy',
        problemStatement: '',
        constraints: '',
        testCases: '',
        tags: '',
        timestamp:Timestamp.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-2xl font-bold text-indigo-300 sm:text-3xl">Add a Problem</h1>

        <p className="mx-auto mt-2 max-w-md text-center text-gray-300">
          Add the problem's Name, a brief description, test cases &#40;preferably edge cases too&#41;, along with Constraints and topic tags.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8">
          <div>
            <label htmlFor="name" className="sr-only">Problem Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm text-black"
              placeholder="Problem Name"
              required
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="sr-only">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-500 p-3 text-sm shadow-sm text-gray-900"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label htmlFor="problemStatement" className="sr-only">Problem Statement</label>
            <textarea
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm text-black"
              placeholder="Problem Statement"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="constraints" className="sr-only">Constraints</label>
            <textarea
              name="constraints"
              value={formData.constraints}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm text-black"
              placeholder="Constraints"
              rows="3"
              required
            />
          </div>

          <div>
            <label htmlFor="testCases" className="sr-only">Test Cases</label>
            <textarea
              name="testCases"
              value={formData.testCases}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm text-black"
              placeholder="Test Cases (e.g., input: [1,2], output: 3)"
              rows="4"
              
            />
          </div>

          <div className='mb-3'>
            <label htmlFor="tags" className="sr-only">Tags</label>
            <Select
              isMulti
              name="tags"
              options={tagOptions}
              className="basic-multi-select text-black max-h-6"
              classNamePrefix="select"
              onChange={handleTagsChange}
              value={tagOptions.filter(option => formData.tags.includes(option.value))}
              placeholder="Select topic tags"
            />
          </div>

          <button
            type="submit"
            className="block my-3  rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Add Problem
          </button>
        </form>
      </div>
    </div>
  );
}
