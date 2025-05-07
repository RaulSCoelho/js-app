'use client'

import {
  ChartBarIcon,
  Cog6ToothIcon,
  HomeIcon,
  LifebuoyIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { useMemo } from 'react'

import { useLanguage } from '@/components/language'
import { SidebarRoute, SidebarRouteProps } from '@/components/sidebar'

import { appSidebarTexts } from './consts'

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
          href: '/users',
          children: multiLangText(appSidebarTexts.routes.users),
          can: { I: 'get', a: 'User' },
          subRoutes: [
            {
              icon: UserGroupIcon,
              href: '/users',
              children: multiLangText(appSidebarTexts.routes.manageUsers)
            }
          ]
        }
      ] as SidebarRouteProps[],
    [multiLangText]
  )

  return (
    <div className="space-y-1 overflow-hidden transition-width">
      {routes.map(({ children, can, ...rest }, i) => (
        <SidebarRoute can={can} key={i} {...rest}>
          {children}
        </SidebarRoute>
      ))}
    </div>
  )
}
