'use client'

import { addToast, Form } from '@heroui/react'
import { useState } from 'react'

import { useUser } from '@/app/_providers/user-provider'
import { Button } from '@/components/button'
import { Input, PasswordInput } from '@/components/input'
import { useLanguage } from '@/components/language'
import { Link } from '@/components/link'
import { Modal } from '@/components/modal'

import { authModalTexts } from './consts'

export * from './consts'

export interface AuthModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const { multiLangText } = useLanguage()
  const { signIn, signUp } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setIsLoading(true)
      if (isLogin) {
        await signIn({ username, password })
      } else {
        await signUp({ username, password, role: 'MEMBER' })
      }
      setUsername('')
      setPassword('')
    } catch (error: any) {
      addToast({ color: 'danger', description: (isLogin ? 'Erro ao logar:' : 'Erro ao criar conta:') + error.message })
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Modal
      title={multiLangText(isLogin ? authModalTexts.titleLogin : authModalTexts.titleRegister)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      fullScreen={false}
      backdrop="blur"
      size="sm"
    >
      <Form className="flex flex-col gap-4 p-6 pt-0" onSubmit={onSubmit}>
        <Input
          label={multiLangText(authModalTexts.usernameLabel)}
          placeholder={multiLangText(authModalTexts.usernamePlaceholder)}
          name="username"
          value={username}
          onValueChange={setUsername}
        />
        <PasswordInput
          label={multiLangText(authModalTexts.passwordLabel)}
          placeholder={multiLangText(authModalTexts.passwordPlaceholder)}
          name="password"
          value={password}
          onValueChange={setPassword}
        />

        <Link as="button" type="button" color="secondary" onPress={() => setIsLogin(prev => !prev)}>
          {isLogin ? multiLangText(authModalTexts.switchToRegister) : multiLangText(authModalTexts.switchToLogin)}
        </Link>
        <div className="flex w-full justify-end">
          <Button type="submit" isLoading={isLoading}>
            {isLogin ? multiLangText(authModalTexts.loginButton) : multiLangText(authModalTexts.registerButton)}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
