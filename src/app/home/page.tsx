"use client";
import GoogleLoginButton from './_components/google-login-button';
import { LoginContent } from './_components/login';
import { RegisterContent } from './_components/register';
export default function AuthPage() {


  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center">

        <LoginContent />

        <h2>Continuar com o Google</h2>
        <GoogleLoginButton />

        <RegisterContent />
      </div>

      <div className="w-1/2 bg-blue-900">
        {/* Imagem */}
      </div>
    </div>
  );
}