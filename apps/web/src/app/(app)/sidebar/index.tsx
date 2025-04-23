'use client'

import { LanguagePopover } from '@/components/language'
import { Sidebar, SidebarToggle } from '@/components/sidebar'
import { ThemeSwitch } from '@/components/theme-switch'

import { AppSidebarRoutes } from './sidebar-routes'

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar content={children} className="bg-default-100">
      <Sidebar.Header>
        <SidebarToggle />
      </Sidebar.Header>
      <Sidebar.Body>
        <AppSidebarRoutes />
      </Sidebar.Body>
      <Sidebar.Footer className="items-center justify-end gap-1.5 text-foreground group-data-[open=false]:flex-col group-data-[open=false]:justify-center">
        <ThemeSwitch />
        <LanguagePopover />
      </Sidebar.Footer>
    </Sidebar>
  )
}
