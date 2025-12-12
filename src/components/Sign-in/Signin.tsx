// src/components/SignInForm.tsx
import React, { useState } from 'react';

interface SignInData {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<SignInData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
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
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
