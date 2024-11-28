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

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail:</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha:</Label>
              <Input id="password" name="password" type="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        <Button variant="green">Login</Button>
        <Link href="/signup" className={buttonVariants({ variant: 'link' })} >
          Não possui uma conta? Cadastre-se
        </Link>
      </CardFooter>
    </Card>
  )
}
