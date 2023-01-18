import { SignIn } from './SignIn';

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-4 flex-1 items-center justify-center w-screen h-screen bg-black text-gray-400">
      <h1 className="font-bold text-2xl">Login</h1>
      <SignIn />
    </div>
  );
}
