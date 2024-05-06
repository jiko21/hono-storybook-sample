import { FC } from "hono/jsx";

export const Sample: FC<{color: string}> = ({color}) => {
  return <h1 style={{color}}>Hello Hono!</h1>;
}
