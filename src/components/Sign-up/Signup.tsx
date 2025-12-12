// src/components/SignUpForm.tsx
import React, { useState } from 'react';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
