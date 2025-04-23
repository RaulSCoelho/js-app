import { AppSidebar } from './sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppSidebar>{children}</AppSidebar>
}
