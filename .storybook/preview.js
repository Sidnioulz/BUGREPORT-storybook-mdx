import { addDecorator, addParameters } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { ThemeProvider } from '@xstyled/styled-components'

addParameters({
	options: {
		storySort: (a, b) => {
			// Same file, use order of appearance
			if (a[1].kind === b[1].kind) {
				return 0
			}

			const sortByCriteria = (a, b, criteria, reverse = false) => {
				if (criteria(a) && !criteria(b)) {
					return reverse ? 1 : -1
				}
				if (criteria(b) && !criteria(a)) {
					return reverse ? -1 : 1
				}

				return 0
			}

			return (
				sortByCriteria(a, b, x => x[1].kind === 'Intro') ||
				sortByCriteria(a, b, x => x[1].kind === 'Getting Started') ||
				sortByCriteria(a, b, x => x[1].kind.startsWith('Buildr Guide')) ||
				sortByCriteria(a, b, x => !x[1].kind.includes('/'), true) ||
				sortByCriteria(a, b, x => x[1].kind.startsWith('API Reference')) ||
				sortByCriteria(a, b, x => x[1].kind.startsWith('Tutorials')) ||
				a[1].id.localeCompare(b[1].id, { numeric: true })
			)
		},
	},
})

// NOTE: order of imports matters. JSX will pick up noise from previous
// decorators, for instance. Always test all decorators if you change it.

// 1. Accessibility
addDecorator(withA11y)

// 2. Props documentation in the canvas
addDecorator(
	withPropsTable({
		propTablesExclude: [ThemeProvider],
	})
)

// 4. JSX rendering in the canvas.
// NOTE: the regexp must be adapted to the theme provider in use.
// const re = new RegExp('<ThemeProvider\n  theme=[^>]*\n>\n(.*)\n</ThemeProvider>', 'ms') // withCustomThemeProvider
const re = new RegExp('<mapProps[^>]*>\n(.*)\n</mapProps[^>]*>', 'ms') // withThemesProvider

addDecorator((story, params) => {
	params.parameters.jsx = {
		showFunctions: false,
		onBeforeRender: domString => {
			try {
				const componentCode = domString.match(re)[1]
				return componentCode.split('\n  ').join('\n')
			} catch (e) {
				return domString
			}
		},
	}

	return jsxDecorator(story, params)
})
