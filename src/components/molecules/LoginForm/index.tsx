'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema';
import { z } from 'zod';
import { useLogin } from '@/hooks/useDogs';

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { mutate } = useLogin();

  const handleLogin = async (data: { name: string; email: string }) => {
    try {
      await mutate({ name: data.name, email: data.email });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      {/* Name Input */}
      <div>
        <input
          {...register('name')}
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
