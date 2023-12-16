import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'


describe('<Togglable /> Generic use', () => {

	let container

	beforeEach( () => {
		container = render(
    	  <Togglable buttonLabel="show...">
    	    <div className="testDiv" >
    	      togglable content
    	    </div>
    	  </Togglable>
    	).container
	})

	test('children are rendered', async () => {

		await screen.findAllByText('togglable content')
	})

	test('children are not displayed after first render', () => {

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('children are displayed after button is clicked', async () => {

		const user = userEvent.setup()
		const button = screen.getByText('show...')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('toggled content can be closed', async () => {

		const user = userEvent.setup()
		
		const button = screen.getByText('show...')
		await user.click(button)

		const closeButton = screen.getByText('cancel')
		await user.click(closeButton)

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})
})