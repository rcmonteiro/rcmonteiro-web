---
updatedAt: "2024-06-19T14:00:00.000Z"
title: "Day three - The Front End"
project: "Utter Todo"
excerpt: "Now is time to build a simple and responsive front-end to our Todo App."
tags: ["Server Actions", "Server Components", "React"]
repoUrl: "https://github.com/rcmonteiro/utter-todo"
prev: "day-two-the-business-rules"
---

For the front-end, let's keep it simple, because the main goal of this project is the CI/CD pipeline.

Let's install some dependencies:

```bash
pnpm add dayjs next-themes ky cookies-next
pnpm add -D tailwind-variants @testing-library/jest-dom @testing-library/react @testing-library/user-event happy-dom @playwright/test @types/react @vitejs/plugin-react @faker-js/faker @next/eslint-plugin-next
npx shadcn-ui@latest add avatar button dropdown-menu label input checkbox separator
```

Creating the a simple and responsive task page and components:

![alt text](/posts/front-end.png)

- [pages](https://github.com/rcmonteiro/utter-todo/blob/main/apps/web/src/app)
- [components](https://github.com/rcmonteiro/utter-todo/blob/main/apps/web/src/components)

I've chosen to use server components with server actions, with useTransition hooks, because in the next React19 version it will be more common to use them, so, why not practice in the current version?

For example, to work with the create task use case:

**The form component**

```typescript
// ./apps/web/src/components/new-task-form.tsx

'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { createTaskAction } from '../app/tasks/actions'
import { Button } from './ui/button'
import { Input } from './ui/input'

const NewTaskForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    e.currentTarget.reset()
    startTransition(async () => {
      await createTaskAction(formData)
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex w-full max-w-xl items-center space-x-2 rounded-lg border-2 border-muted p-4 has-[:focus-visible]:ring-2">
        <Input
          type="text"
          name="title"
          placeholder="Create a new task"
          className="focus-visible: rounded-none border-0 outline-none focus-visible:ring-0"
        />
        <Button type="submit" disabled={isPending}>
          <Plus className="size-4" />
          <span className="sr-only">Create new task</span>
        </Button>
      </div>
    </form>
  )
}
NewTaskForm.displayName = 'NewTaskForm'

export { NewTaskForm }
```

**The server action**

```typescript
// ./apps/web/src/app/tasks/actions.ts

'use server'

import { HTTPError } from 'ky'

import { createTask } from '../../http/create-task'

export const createTaskAction = async (data: FormData) => {
  const formDataValidationResult = createTaskSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!formDataValidationResult.success) {
    return false
  }

  const { title } = formDataValidationResult.data

  try {
    await createTask({ title })
    return true
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      console.log(message)
      // Todo: To be implemented
    }
    return false
  }
}
```
And finally, the http request, using the `ky` library:

```typescript
// ./apps/web/src/http/create-task.ts

import { api } from '../lib/ky'

type CreateTaskRequest = {
  title: string
}

export async function createTask({ title }: CreateTaskRequest): Promise<void> {
  await api.post(`tasks`, {
    json: {
      title,
    },
  })
}
```
