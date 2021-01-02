const React = require('react')
const { ThemeProvider } =  require('theme-ui')
const {deep} = require('@theme-ui/presets')
const {IdentityProvider} = require('./identityContext')
const {ApolloProvider} = require('@apollo/client')
const {client} = require('./client')

module.exports = ({element}) => (
  <ThemeProvider theme={deep}>
  <ApolloProvider client = {client}>
  <IdentityProvider>
  {element}
  </IdentityProvider>
  </ApolloProvider> 
  </ThemeProvider>
)