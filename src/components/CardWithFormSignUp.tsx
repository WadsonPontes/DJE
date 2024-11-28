'use client'

import * as React from "react"

import Image from "next/image"
import Link from 'next/link'
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'

const createUserFormSchema = z
  .object({
    nome: z
      .string()
      .min(1, 'O nome é obrigatório')
      .min(5, 'O nome deve ter no mínimo 5 letras'),
    email: z
      .string()
      .min(1, 'O email é obrigatório')
      .email('Formato de e-mail inválido'),
    senha: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/\d/, 'A senha deve conter pelo menos um número')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'A senha deve conter pelo menos um caractere especial (!, @, #, $, etc.)'
      ),
      confirmarsenha: z.string().min(1, 'A confirmação de senha é obrigatória'),
  })
  .refine((data) => data.senha === data.confirmarsenha, {
    message: 'A senha e a confirmação de senha devem corresponder',
    path: ['confirmarsenha'], // Aponta o erro para o campo correto
  });

type createUserFormData = z.infer<typeof createUserFormSchema>

export function CardWithFormSignUp() {
  const [ output, setOutput ] = React.useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  async function signUpUser(data: any) {
    const user = JSON.stringify(data, null, 2);
    
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: user,
    })

    if (res.ok) {
      const message = await res.json()

      if (message.error && message.nome) {
        setOutput(message.nome)
      }
      else if (message.error && message.email) {
        setOutput(message.email)
      }
      else if (message.error && message.senha) {
        setOutput(message.senha)
      }
      else if (message.error && message.confirmarsenha) {
        setOutput(message.confirmarsenha)
      }
      else if (!message.error) {
        redirect('/login')
      }
    }
  }

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleSubmit(signUpUser)} >
        <CardHeader className="items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={320}
            height={90}
            priority
          />
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nome">Seu nome completo: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="nome" type="text" {...register('nome')} />
              { errors.nome && <span className="text-xs text-red-500">{errors.nome.message}</span> }
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="email" type="email" {...register('email')} />
              { errors.email && <span className="text-xs text-red-500">{errors.email.message}</span> }
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="senha">Senha: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="senha" type="password" {...register('senha')} />
              { errors.senha && <span className="text-xs text-red-500">{errors.senha.message}</span> }
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmarsenha">Confirme sua senha: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="confirmarsenha" type="password" {...register('confirmarsenha')} />
              { errors.confirmarsenha && <span className="text-xs text-red-500">{errors.confirmarsenha.message}</span> }
              { output && <span className="text-xs text-red-500">{output}</span> }
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <Link href="/login" className={buttonVariants({ variant: 'minilink' })} >
            Já possui uma conta? Fazer o login
          </Link>
          <Button variant="green" type="submit">Criar conta</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
