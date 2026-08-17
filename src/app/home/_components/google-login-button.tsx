"use client"
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { getApiUrl } from '@/lib/api';

export default function GoogleLoginButton() {


  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    // 1. O Google te deu o Token dele!
    const tokenDoGoogle = credentialResponse.credential;

    try {
      // 2. Manda pro nosso Backend (Express)
      const response = await axios.post(`${getApiUrl()}/session/google`, {
        googleToken: tokenDoGoogle
      });

      // 3. O nosso Backend respondeu com o NOSSO Token JWT e os dados do usuário!
      const { token, name, email, profile } = response.data;

      // 4. Salva o nosso token nos cookies ou localStorage e manda pro Dashboard!
      localStorage.setItem("@fintech.token", token);
      alert(`Bem-vindo(a), ${name}!`);
      // redirecionar para o /dashboard...

    } catch (error) {
      console.log("Erro ao validar com nosso backend", error);
    }
  };

  return (

    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.log('Login Falhou')}
    />
  )

}