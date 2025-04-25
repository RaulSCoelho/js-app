'use client'

import {
  BeakerIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  IdentificationIcon,
  LifebuoyIcon,
  UserIcon,
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
        { icon: HomeIcon, href: '/', children: multiLangText(appSidebarTexts.routes.home) },
        { icon: ChartBarIcon, href: '#', children: multiLangText(appSidebarTexts.routes.dashboard) },
        { icon: Cog6ToothIcon, href: '#', children: multiLangText(appSidebarTexts.routes.settings) },
        {
          icon: DocumentTextIcon,
          href: '#',
          children: multiLangText(appSidebarTexts.routes.docs),
          subRoutes: [
            {
              icon: BookOpenIcon,
              href: '#getting-started',
              children: multiLangText(appSidebarTexts.routes.gettingStarted)
            },
            {
              icon: CodeBracketIcon,
              href: '#api-reference',
              children: multiLangText(appSidebarTexts.routes.apiReference)
            },
            {
              icon: BeakerIcon,
              href: '#examples',
              children: multiLangText(appSidebarTexts.routes.examples)
            }
          ]
        },
        {
          icon: UsersIcon,
          href: '#',
          children: multiLangText(appSidebarTexts.routes.team),
          subRoutes: [
            {
              icon: UserIcon,
              href: '#members',
              children: multiLangText(appSidebarTexts.routes.members)
            },
            {
              icon: IdentificationIcon,
              href: '#roles',
              children: multiLangText(appSidebarTexts.routes.roles)
            },
            {
              icon: EnvelopeIcon,
              href: '#invitations',
              children: multiLangText(appSidebarTexts.routes.invitations)
            },
            {
              icon: ClipboardDocumentListIcon,
              href: '#activity-log',
              children: multiLangText(appSidebarTexts.routes.activityLog)
            }
          ]
        },
        { icon: LifebuoyIcon, href: '#', children: multiLangText(appSidebarTexts.routes.support) }
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
