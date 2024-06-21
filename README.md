# Шаблон для выполнения домашнего задания по типизации

ШРИ лето 2024

## Что делать?

Текущий репозиторий написан на чистом js. Надо все файлы внутри директории `src` перевести на ts.

Код файла test/run.ts править необязательно, он не пойдёт в проверку. Но он может помочь понять, как используются функции из src.

- После компиляции js файлы должны быть такими же, как и исходные.
  Выравнивание и прочее запускается `npm run compare`, для сравнения исходные файлы скопированы как есть в директорию `raw`.
  Это нужно, так как задача не модифицировать или улучшить код, а добавить типы.

- `any`, `unknown` и `never` запрещены
- `as` запрещён, но `as const` разрешён
- `!` запрещён

Код представляет собой разные манипуляции 14 сегментным дисплеем. Демо запускается `npm run start`

## Процесс

- поставьте указанную версию node/npm c помощью `nvm use` (установите себе nvm, если его нет)
- `npm i`
- `npm run start` для запуска демо
- ...перевод на ts...
- `npm run build` сборка, `tsconfig.json` менять нельзя
- `npm run compare` сверка выхлопа транспиляции (выравнивание prettier), файлы в dist и raw должны совпадать

## Суть проверки

Код в репозитории был скомпилирован из исходников на TS. Типы в решении должны быть подтипами исходных типов, то есть не менее строгими. Проверка запускается через кастомное eslint правило, результаты будут видны при проверке.

Все проверки eslint:

```js
{
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'custom-ts-subtypeof': 'error', // сравнение с эталонными типами
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
  },
};
```

## Отправка решения

Cожмите вашу папку src (только её, а не весь проект) в архив src.zip. Этот архив отправьте в качестве решения.
