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
import AuthActions from "../actions/auth-actions"

export function CardWithFormLogin() {
  return (
    <Card className="w-[350px]">
      <form action={AuthActions.loginAccount}>
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
              <Input id="email" name="email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="senha">Senha:</Label>
              <Input id="senha" name="senha" type="password" />
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
