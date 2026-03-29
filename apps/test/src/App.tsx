import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui-core/components/alert"
import { Button } from "@workspace/ui-core/components/button"

export function App() {
  return (
    <main
      className="mx-auto flex min-h-svh w-full max-w-3xl items-center justify-center p-6"
      lang="zh-CN"
    >
      <section className="grid w-full max-w-xl gap-4">
        <Alert variant="default">
          <AlertAction>
            <Button type="button" size="xs" variant="outline">
              INFO
            </Button>
          </AlertAction>
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>这是一个信息提示 Alert。</AlertDescription>
        </Alert>

        <Alert variant="success">
          <AlertAction>
            <Button type="button" size="xs" variant="outline">
              OK
            </Button>
          </AlertAction>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>这是一个成功状态 Alert。</AlertDescription>
        </Alert>

        <Alert variant="warning">
          <AlertAction>
            <Button type="button" size="xs">
              WARN
            </Button>
          </AlertAction>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>这是一个警告状态 Alert。</AlertDescription>
        </Alert>

        <Alert variant="error">
          <AlertAction>
            <Button type="button" size="xs" variant="outline">
              ERR
            </Button>
          </AlertAction>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>这是一个错误状态 Alert。</AlertDescription>
        </Alert>
      </section>
    </main>
  )
}
