import userEvent from "@testing-library/user-event"
import Options from "../Options";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";


test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup()
  
  render(<Options optionType="scoops" />)

  // make sure total starts out at $0.00 
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false })
  expect(scoopsSubtotal).toHaveTextContent("0.00")
  // update vanilla scopps to 1 , check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
  await user.clear(vanillaInput)
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00")

  // update chocolate scoops to 2 and  check subtotal 
  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" })
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")
  expect(scoopsSubtotal).toHaveTextContent("6.00")
})

test("Update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup()
  render(<Options optionType="toppings" />)
  // make sure toppings subtotal start out  at 0
  const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false })
  expect(toppingsSubtotal).toHaveTextContent("0.00")

  // update Cherries checked, update subtotal 
  const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })
  expect(cherriesCheckbox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("0.00")
  // Clicked cherries topping
  await user.click(cherriesCheckbox)
  expect(cherriesCheckbox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("1.50")

  // update M&Ms checked , update subtotal 
  const MandMsCheckBox = await screen.findByRole("checkbox", { name: "M&Ms" })
  expect(MandMsCheckBox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("1.50")
  // Clicked M&Ms toppings
  await user.click(MandMsCheckBox)
  expect(MandMsCheckBox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("3.00")

  // update Hot fudge checked, update subtotal 
  const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" })
  expect(hotFudgeCheckbox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("3.00")
  // Clicked Hot fudge topping
  await user.click(hotFudgeCheckbox)
  expect(hotFudgeCheckbox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("4.50")

  // Uncheck Cherries box, update subtotal 
  await user.click(cherriesCheckbox)
  expect(cherriesCheckbox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent("3.00")
})


describe("grand total", () => {
  test("grand total start at $0.00", () => {
    render(<OrderEntry />)
    const grandtotal = screen.getByRole("heading", { name: /grand total: \$/i })
    grandtotal.toHaveTextContent("0.00")
  })
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup()
    render(<OrderEntry />)
    const grandtotal = screen.getByRole("heading", { name: /grand total: \$/i })
    expect(grandtotal).toHaveTextContent("0.00")
    // Add Vanilla scoop
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")

    expect(grandtotal).toHaveTextContent("2.00")

    // Add chocolate topping
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "1")
    expect(grandtotal).toHaveTextContent("4.00")
    
    // Add cherries and grand total 

    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })
    await user.click(cherriesCheckbox)
    expect(grandtotal).toHaveTextContent("5.50")
    
  })
  test("grand total updates properly if topping is added first", async () => { 
    const user = userEvent.setup()
    render(<OrderEntry />) 
    const grandtotal = screen.getByRole("heading", { name: /grand total: \$/i })
    expect(grandtotal).toHaveTextContent(-"0.00")

    // Add Cherries topping
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" })
    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).toBeChecked()
    expect(grandtotal).toHaveTextContent("1.50")

    // Add M&M Topping
    const MandMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" })
    await user.click(MandMsCheckbox)
    expect(MandMsCheckbox).toBeChecked()
    expect(grandtotal).toHaveTextContent("3.00")

    // Add Hot fudge topping
    const hotfudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" })
    await user.click(hotfudgeCheckbox)
    expect(hotfudgeCheckbox).toBeChecked()
    expect(grandtotal).toHaveTextContent("4.50")

    // Add Vanilla scoop 
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")
  })
  test("grand total updates properly if item is removed", () => {
    render(<OrderEntry />)
  })
})