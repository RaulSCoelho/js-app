import { defineAbilityFor } from './ability'
import { userSchema } from './models'
import { Role } from './roles'

export function getUserPermissions(userId: number, role: Role) {
  const authUser = userSchema.parse({ id: userId, role })

  const ability = defineAbilityFor(authUser)

  return ability
}
