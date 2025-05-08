'use client'

import { LanguagePopover } from '@/components/language'
import { Sidebar, SidebarToggle } from '@/components/sidebar'
import { ThemeSwitch } from '@/components/theme-switch'

import { AppSidebarRoutes } from './sidebar-routes'

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar content={children} classNames={{ base: 'bg-default-50', sidebar: 'bg-default-100', content: 'relative' }}>
      <Sidebar.Header>
        <SidebarToggle />
      </Sidebar.Header>
      <Sidebar.Body>
        <AppSidebarRoutes />
      </Sidebar.Body>
      <Sidebar.Footer className="items-center justify-end gap-1.5 text-foreground group-data-[open=false]:flex-col group-data-[open=false]:justify-center">
        <ThemeSwitch />
        <LanguagePopover className="group-data-[open=true]:ml-1" />
      </Sidebar.Footer>
    </Sidebar>
  )
}
