// NOTE: The Storybook addon for theme switching is based on styled-components,
// but we use xstyled instead. I am not excluding the possibility of a conflict
// in the future between those two packages, so this file provides you with an
// alternative way to decorate our components with the default LJN theme using
// xstyled. If, in the future, the Storybook addon stops working, you may
// replace it in preview.js using the following code:
//
// ```
// import withCustomThemeProvider from './withCustomThemeProvider'
//
// addDecorator(withCustomThemeProvider)
// ```
//
// And by removing

import React from 'react'
import { ThemeProvider } from '@xstyled/styled-components'

const withCustomThemeProvider = storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>

export default withCustomThemeProvider
