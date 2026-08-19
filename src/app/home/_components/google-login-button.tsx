"use client"
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { getApiUrl } from '@/lib/api';
import { loginGoogleUser } from '@/actions/auth';

export default function GoogleLoginButton() {


  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    // 1. O Google te deu o Token dele!
    const tokenDoGoogle = credentialResponse.credential;

    try {
      // 2. Manda pro nosso Backend (Express)
      const response = await axios.post(
        `${getApiUrl()}/session/google`,
        {
          googleToken: tokenDoGoogle
        }
      );

      console.log("RESPOSTA DO BACKEND:");
      console.log(response.data);
      ``

      // 3. O nosso Backend respondeu com o NOSSO Token JWT e os dados do usuário!
      const { token, name, email } = response.data;
      console.log("TOKEN RECEBIDO:");
      console.log(token);


      // 4. Salva o nosso token nos cookies ou localStorage e manda pro Dashboard!
      await loginGoogleUser(token);

      window.location.href =
        "/dashboard";
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