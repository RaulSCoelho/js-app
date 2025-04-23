'use client'

import { useMemo } from 'react'

import { useLanguage } from '@/components/language'
import { SidebarRoute, SidebarRouteProps } from '@/components/sidebar'
import { HomeIcon, Cog6ToothIcon, ChartBarIcon, DocumentTextIcon, LifebuoyIcon } from '@heroicons/react/24/outline'

import { protectedSidebarTexts } from './consts'

export function SidebarRoutes() {
  const { multiLangText } = useLanguage()
  const routes = useMemo(
    () =>
      [
        { icon: HomeIcon, href: '/', children: multiLangText(protectedSidebarTexts.routes.home) },
        { icon: ChartBarIcon, href: '#', children: multiLangText(protectedSidebarTexts.routes.dashboard) },
        { icon: Cog6ToothIcon, href: '#', children: multiLangText(protectedSidebarTexts.routes.settings) },
        { icon: DocumentTextIcon, href: '#', children: multiLangText(protectedSidebarTexts.routes.docs) },
        { icon: LifebuoyIcon, href: '#', children: multiLangText(protectedSidebarTexts.routes.support) }
      ] as SidebarRouteProps[],
    [multiLangText]
  )

  return (
    <div className="space-y-1 overflow-hidden transition-width">
      {routes.map(({ children, ...rest }, i) => (
        <SidebarRoute {...rest} key={i}>
          {children}
        </SidebarRoute>
      ))}
    </div>
  )
}
