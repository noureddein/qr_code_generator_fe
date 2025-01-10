# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
	languageOptions: {
		// other options...
		parserOptions: {
			project: ["./tsconfig.node.json", "./tsconfig.app.json"],
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
	// Set the react version
	settings: { react: { version: "18.3" } },
	plugins: {
		// Add the react plugin
		react,
	},
	rules: {
		// other rules...
		// Enable its recommended rules
		...react.configs.recommended.rules,
		...react.configs["jsx-runtime"].rules,
	},
});
```

```javascript
    useQuery<TData, TError, TQueryData, TQueryKey>(
        queryKey: TQueryKey,
        queryFn: () => Promise<TData>,
        options?: UseQueryOptions<TData, TError, TQueryData, TQueryKey>
    );
```

TData: The type of data returned by the query function.
TError: The type of error thrown by the query function.
TQueryData: The transformed data type (used with select option).
TQueryKey: The type of the query key.

```javascript
import { useQuery } from 'react-query';

type Todo = { id: string; title: string };
type Error = { message: string };

const { data, error } = useQuery<Todo[], Error>(
  ['todos'],
  async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  }
);
```
