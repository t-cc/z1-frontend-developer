import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StatusButton } from './index'

describe('StatusButton', () => {
    it('renders button and status text', () => {
        const {container}  = render(<StatusButton statusText={"my status text"} statusType=""/>)
        expect(screen.getByText("my status text")).toBeInTheDocument()
    })
})
