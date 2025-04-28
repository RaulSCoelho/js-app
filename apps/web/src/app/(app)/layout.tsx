import { AppSidebar } from './_sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppSidebar>{children}</AppSidebar>
}
