// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// const loginSchema = z.object({
//   name: z.string().min(3, 'Name must be at least 3 characters'),
//   email: z.string().email('Invalid email address'),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const LoginForm = ({
//   loginAction,
// }: {
//   loginAction: (data: LoginFormData) => void;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   return (
//     <form onSubmit={handleSubmit(loginAction)} className="space-y-4">
//       {/* Name Input */}
//       <div>
//         <input
//           {...register('name')}
//           type="text"
//           placeholder="Name"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//         />
//         {errors.name && (
//           <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//         )}
//       </div>

//       {/* Email Input */}
//       <div>
//         <input
//           {...register('email')}
//           type="email"
//           placeholder="Email"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { login } from '@/services/api';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const handleLogin = async (data: { name: string; email: string }) => {
    try {
      await login(data.name, data.email);
      router.push('/search');
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
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
