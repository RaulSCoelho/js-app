'use client'

import { ChartBarIcon, Cog6ToothIcon, HomeIcon, LifebuoyIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'

import { Can, CanProps } from '@/components/casl'
import { useLanguage } from '@/components/language'
import { SidebarRoute, SidebarRouteProps } from '@/components/sidebar'

import { appSidebarTexts } from './consts'

export type AppSidebarRouteProps = SidebarRouteProps & {
  can?: Omit<CanProps, 'children'>
}

export function AppSidebarRoutes() {
  const { multiLangText } = useLanguage()
  const routes = useMemo(
    () =>
      [
        {
          icon: HomeIcon,
          href: '/',
          children: multiLangText(appSidebarTexts.routes.home)
        },
        { icon: ChartBarIcon, href: '#', children: multiLangText(appSidebarTexts.routes.dashboard) },
        { icon: Cog6ToothIcon, href: '#', children: multiLangText(appSidebarTexts.routes.settings) },
        { icon: LifebuoyIcon, href: '#', children: multiLangText(appSidebarTexts.routes.support) },
        {
          icon: UsersIcon,
          href: '#',
          children: 'Users',
          can: { I: 'manage', a: 'User' },
          subRoutes: [
            {
              icon: UserIcon,
              href: '#',
              children: 'List'
            }
          ]
        }
      ] as AppSidebarRouteProps[],
    [multiLangText]
  )

  return (
    <div className="space-y-1 overflow-hidden transition-width">
      {routes.map(({ children, can, ...rest }, i) => (
        <Can key={i} {...can}>
          <SidebarRoute {...rest}>{children}</SidebarRoute>
        </Can>
      ))}
    </div>
  )
}
