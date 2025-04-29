import { AuthButton } from '@/components/button'

import { AppSidebar } from './_sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppSidebar>
      <AuthButton className="fixed right-4 top-4" />
      {children}
    </AppSidebar>
  )
}
