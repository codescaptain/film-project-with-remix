import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './tailwind.css'

export const links: LinksFunction = () => {
  return[{rel: 'stylesheet', href: styles}];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Studio Codescaptain",
  viewport: "width=device-width,initial-scale=1",
  description: 'A description'
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary ({error}: any){
  console.log(error);

  return(
    <html>
    <head>
      <title>Oh no!</title>
      <Meta/>
      <Links/>
    </head>
    <body>
      {/* add the UI you want your users to see */}
      {error.message}
      <Scripts/>
    </body>
    </html>
  )
  
}
