import AuthService from '@/services/auth-service'
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

async function loginAccount(formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const senha = formData.get('senha') as string

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    })

    if (user) {
        const isMatch = await bcrypt.compare(senha, user.password)

        if (isMatch) {
            await AuthService.createSessionToken({sub: user.id, name: user.name, email: user.email})

            redirect('/kanban')
        }
    }
}

const AuthActions = { createAccount, loginAccount }

export default AuthActions