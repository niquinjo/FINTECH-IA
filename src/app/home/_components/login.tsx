"use client"
import { useState } from 'react';
import { useLoginForm, LoginFormData } from '../hooks/login-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser } from '../../../actions/auth';
import { useRouter } from 'next/navigation';

export function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useLoginForm();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    const result = await loginUser({
      email: data.email,
      password: data.password
    });

    setIsLoading(false);

    if (result.success) {
      form.reset();
      router.push('/dashboard');
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-4xl font-bold text-brand-dark tracking-tight">Faça login</h1>
        <p className="text-brand-dark/80 font-medium">Venha descobrir como organizar melhor sua vida!</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-dark font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-transparent focus:border-brand-primary text-black shadow-sm"
                    placeholder="seu@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-brand-dark font-bold">Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="bg-white border-transparent focus:border-brand-primary text-black shadow-sm"
                    placeholder="Digite sua senha..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <p className="text-red-700 bg-red-100 p-2 rounded text-sm font-semibold text-center">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-linear-to-br
            from-brand-secondary 
            to-brand-primary  
            text-white 
            font-semibold 
            transition-all 
            shadow-md py-6
            hover:from-brand-accent
            hover:to-brand-muted
            hover:brightness-110
            hover:shadow-xl
            duration-300
            "
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

        </form>
      </Form>
    </div>
  )
}