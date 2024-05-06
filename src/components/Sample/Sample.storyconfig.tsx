import { Context } from 'hono';
import { Sample } from './Sample';

export const forPath = '/sample'

export const forStory = (ctx: Context) => {
  const color = ctx.req.query('color') ?? 'red'
  return ctx.html(<Sample color={color}/>)
}
