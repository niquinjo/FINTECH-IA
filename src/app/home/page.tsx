"use client";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import GoogleLoginButton from './_components/google-login-button';
import { RegisterContent } from './_components/register';
import Link from 'next/link';
export default function AuthPage() {


  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center">
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