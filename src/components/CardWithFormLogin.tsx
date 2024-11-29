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

const createUserFormSchema = z.object({
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de e-mail inválido'),
  senha: z.string()
  .min(1, 'A senha é obrigatória')
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export function CardWithFormLogin() {
  const [ output, setOutput ] = React.useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  async function loginUser(data: {senha: string; email: string;}) {
    const user = JSON.stringify(data, null, 2);
    
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: user,
    })

    if (res.ok) {
      const message = await res.json()

      if (message.error && message.email) {
        setOutput(message.email)
      }
      else if (message.error && message.senha) {
        setOutput(message.senha)
      }
      else if (!message.error) {
        redirect('/kanban')
      }
    }
  }

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleSubmit(loginUser)} >
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
              <Label htmlFor="email">E-mail:</Label>
              <Input id="email" type="email" {...register('email')} />
              { errors.email && <span className="text-xs text-red-500">{errors.email.message}</span> }
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="senha">Senha:</Label>
              <Input id="senha" type="password" {...register('senha')} />
              { errors.senha && <span className="text-xs text-red-500">{errors.senha.message}</span> }
              { output && <span className="text-xs text-red-500">{output}</span> }
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <Button variant="green" type="submit">Login</Button>
          <Link href="/signup" className={buttonVariants({ variant: 'link' })} >
            Não possui uma conta? Cadastre-se
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
