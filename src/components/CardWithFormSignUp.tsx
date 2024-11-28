import * as React from "react"

import Image from "next/image"
import Link from 'next/link'
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthActions from "../actions/auth"

export function CardWithFormSignUp() {
  return (
    <Card className="w-[350px]">
      <form action={AuthActions.createAccount}>
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
              <Input id="nome" name="nome" type="text" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="senha">Senha: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="senha" name="senha" type="password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmarsenha">Confirme sua senha: <span className="text-red-500 font-bold">*</span></Label>
              <Input id="confirmarsenha" name="confirmarsenha" type="password" />
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
