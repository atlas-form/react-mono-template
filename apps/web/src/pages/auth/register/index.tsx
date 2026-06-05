import { AuthView } from "@workspace/app-kit/auth"
import { useRegisterPage } from "./use-register-page"

export default function RegisterPage() {
  const registerPage = useRegisterPage()

  return <AuthView {...registerPage} />
}
