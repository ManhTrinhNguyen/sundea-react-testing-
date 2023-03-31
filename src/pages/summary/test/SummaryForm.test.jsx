import { render, screen } from '@testing-library/react' 
import SummaryForm from '../SummaryForm'
import userEvent from "@testing-library/user-event"

test("Checkbox enables button", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />)
  const checkbox = screen.getByRole("checkbox", {name : "I agree to Terms and Conditions"})
  const button = screen.getByRole("button", {name: "Confirm order"})
  expect(checkbox).not.toBeChecked()
  expect(button).toBeDisabled()

  await user.click(checkbox)
  expect(checkbox).toBeChecked()
  expect(button).toBeEnabled()

  await user.click(checkbox)
  expect(checkbox).not.toBeChecked()
  expect(button).toBeDisabled()
})

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />)

  /// popover starts out hidden
  const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox lable
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()
  // popover disappears when we mouse out 

  await user.unhover(termsAndConditions)
  expect(popover).not.toBeInTheDocument()
})

