import React from 'react'
import { ThemeProvider } from './ThemeContext'

describe('<ThemeProvider />', () => {
  it('renders', () => {
    // Envolva algum conteúdo, mesmo que simples, para atender à prop children
    cy.mount(
      <ThemeProvider>
        <div>Teste</div>
      </ThemeProvider>
    )
  })
})
