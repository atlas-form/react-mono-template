import { AuthRegisterView } from "@workspace/app-kit/register"
import { useRegisterPage } from "./use-register-page"

export default function RegisterPage() {
  const registerPage = useRegisterPage()

  return <AuthRegisterView {...registerPage} />
}
