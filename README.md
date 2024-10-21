# DALL·E Playground

DALL·E Playground (Unofficial) is used to play with OpenAI Image generation API - [DALL·E](https://openai.com/dall-e-3), You must use your own [OpenAI API Key](https://platform.openai.com/account/api-keys)

> As of November 20, 2023, DALL·E is not supported by [OpenAI Playground](https://platform.openai.com/playground). Therefore, I have created this playground instead.

![screenshot](./screenshots/screenshot.png)

[Live Preview](https://dalle3-playground.pages.dev)


## Features

- [x] Chat to generate images
- [x] Gallery mode
- [x] Persistent data
- [x] Responsive UI
- [x] Cancel generation
- [x] Error Handling


## Project Structure

```sh
src
├── app.tsx     # App entry
├── assets      # Assets for images, favicon etc
├── components  # React components
├── hooks       # React hooks
├── i18n        # i18n files
├── lib         # Utils、tools、services
├── main.tsx    # File entry
├── pages       # One .tsx per page
├── router.tsx  # Routers
├── styles      # Less files
├── types       # Typescript types
└── vite-env.d.ts
```


## Dev

```sh
yarn
yarn dev
```

