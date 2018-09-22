import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import userEvent from '../src'

afterEach(cleanup)

describe('fireEvent.click', () => {
  it.each(['input', 'textarea'])(
    'should fire the correct events for <%s>',
    type => {
      const onMouseOver = jest.fn()
      const onMouseMove = jest.fn()
      const onMouseDown = jest.fn()
      const onFocus = jest.fn()
      const onMouseUp = jest.fn()
      const onClick = jest.fn()
      const { getByTestId } = render(
        React.createElement(type, {
          'data-testid': 'element',
          onMouseOver: onMouseOver,
          onMouseMove: onMouseMove,
          onMouseDown: onMouseDown,
          onFocus: onFocus,
          onMouseUp: onMouseUp,
          onClick: onClick,
        })
      )

      expect(onMouseOver).not.toHaveBeenCalled()
      expect(onMouseMove).not.toHaveBeenCalled()
      expect(onMouseDown).not.toHaveBeenCalled()
      expect(onFocus).not.toHaveBeenCalled()
      expect(onMouseUp).not.toHaveBeenCalled()
      expect(onClick).not.toHaveBeenCalled()

      userEvent.click(getByTestId('element'))

      expect(onMouseOver).toHaveBeenCalledTimes(1)
      expect(onMouseMove).toHaveBeenCalledTimes(1)
      expect(onMouseDown).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onMouseUp).toHaveBeenCalledTimes(1)
      expect(onClick).toHaveBeenCalledTimes(1)
    }
  )

  it('should fire the correct events for <div>', () => {
    const onMouseOver = jest.fn()
    const onMouseMove = jest.fn()
    const onMouseDown = jest.fn()
    const onFocus = jest.fn()
    const onMouseUp = jest.fn()
    const onClick = jest.fn()
    const { getByTestId } = render(
      <div
        data-testid="div"
        onMouseOver={onMouseOver}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onMouseUp={onMouseUp}
        onClick={onClick}
      />
    )

    expect(onMouseOver).not.toHaveBeenCalled()
    expect(onMouseMove).not.toHaveBeenCalled()
    expect(onMouseDown).not.toHaveBeenCalled()
    expect(onFocus).not.toHaveBeenCalled()
    expect(onMouseUp).not.toHaveBeenCalled()
    expect(onClick).not.toHaveBeenCalled()

    userEvent.click(getByTestId('div'))

    expect(onMouseOver).toHaveBeenCalledTimes(1)
    expect(onMouseMove).toHaveBeenCalledTimes(1)
    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onFocus).not.toHaveBeenCalled()
    expect(onMouseUp).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('toggles the focus', () => {
    const { getByTestId } = render(
      <React.Fragment>
        <input data-testid="A" />
        <input data-testid="B" />
      </React.Fragment>
    )

    const a = getByTestId('A')
    const b = getByTestId('B')

    expect(a).not.toHaveFocus()
    expect(b).not.toHaveFocus()

    userEvent.click(a)
    expect(a).toHaveFocus()
    expect(b).not.toHaveFocus()

    userEvent.click(b)
    expect(a).not.toHaveFocus()
    expect(a).not.toHaveFocus()
  })

  it.each(['input', 'textarea'])(
    'gives focus to <%s> when clicking a <label> with htmlFor',
    type => {
      const { getByTestId } = render(
        <React.Fragment>
          <label htmlFor="input" data-testid="label">
            Label
          </label>
          {React.createElement(type, { id: 'input', 'data-testid': 'input' })}
        </React.Fragment>
      )
      userEvent.click(getByTestId('label'))
      expect(getByTestId('input')).toHaveFocus()
    }
  )

  it.each(['input', 'textarea'])(
    'gives focus to <%s> when clicking a <label> without htmlFor',
    type => {
      const { getByTestId } = render(
        <React.Fragment>
          <label data-testid="label">
            Label
            {React.createElement(type, { 'data-testid': 'input' })}
          </label>
        </React.Fragment>
      )
      userEvent.click(getByTestId('label'))
      expect(getByTestId('input')).toHaveFocus()
    }
  )

  it.each(['input', 'textarea'])(
    'gives focus to <%s> when clicking on an element contained within a <label>',
    type => {
      const { getByText, getByTestId } = render(
        <React.Fragment>
          <label htmlFor="input" data-testid="label">
            <span>Label</span>
          </label>
          {React.createElement(type, { id: 'input', 'data-testid': 'input' })}
        </React.Fragment>
      )
      userEvent.click(getByText('Label'))
      expect(getByTestId('input')).toHaveFocus()
    }
  )
})
