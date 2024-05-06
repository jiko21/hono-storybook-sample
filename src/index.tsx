import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { cors } from 'hono/cors'
import path from 'node:path'
import { Glob } from 'bun';

const app = new Hono();
const Layout: FC<{color: string;}> = (props) => {
  return (
    <html>
      <body style={{ backgroundColor: props.color}}>{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout color="yellow">
      <h1>Hello Hono!</h1>
      <button>aaa</button>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}

app.use(
  '/*',
  cors({
    origin: 'http://localhost:6006',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

const glob = new Glob('**/*.storyconfig.tsx');

for await (const file of glob.scan(path.join(process.cwd(), 'src/components'))) {
  const {forPath, forStory} = await import(path.join(process.cwd(), 'src/components', file));
  app.get(path.join('/stories', forPath), forStory);
}

export default app
