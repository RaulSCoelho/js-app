'use client'

import { PressEvent } from '@heroui/react'
import { forwardRef, useState } from 'react'

import { useUser } from '@/app/_providers/user-provider'

import { MultiLangText } from '../language'
import { AuthModal } from '../modal'
import { Button, ButtonProps } from './button'

export type AuthButtonProps = ButtonProps

export const authButtonTexts = {
  signIn: {
    en: 'Sign In',
    'pt-BR': 'Entrar',
    es: 'Iniciar sesión',
    fr: 'Se connecter',
    de: 'Anmelden'
  },
  signOut: {
    en: 'Sign Out',
    'pt-BR': 'Sair',
    es: 'Cerrar sesión',
    fr: 'Se déconnecter',
    de: 'Abmelden'
  }
}

export const AuthButton = forwardRef<HTMLButtonElement, ButtonProps>(function AuthButton(
  { children, color = 'default', onPress, ...rest },
  ref
) {
  const { user, signOut } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  function handlePress(e: PressEvent) {
    if (user) {
      signOut()
    } else {
      setIsOpen(true)
    }
    onPress?.(e)
  }

  return (
    <>
      <Button ref={ref} color={color} onPress={handlePress} {...rest}>
        {children ?? <MultiLangText texts={user ? authButtonTexts.signOut : authButtonTexts.signIn} />}
      </Button>
      <AuthModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
})
