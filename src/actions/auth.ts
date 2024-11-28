import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

async function createAccount(formData: FormData) {
    'use server'

    const name = formData.get('nome') as string
    const email = formData.get('email') as string
    const senha = formData.get('senha') as string
    const confirmarsenha = formData.get('confirmarsenha') as string
    const password = await bcrypt.hash(senha, 10)

    await prisma.user.create({
        data: {
            email,
            password,
            name,
        }
    })

    redirect('/login')
}

const AuthActions = { createAccount }

export default AuthActions