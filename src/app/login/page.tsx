import LoginForm from '@/components/molecules/LoginForm';

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Login
        </h1>
        <LoginForm />
      </div>
    </section>
  );
}
