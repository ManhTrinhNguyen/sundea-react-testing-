import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />)

  // find images

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2);

  // Confrim alt text of images
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
})

test("display image for each Toppings option from server", async () => {
  render(<Options optionType="toppings" />)

  //find image 
  const toppingImage = await screen.findAllByRole("img", { name: /topping$/i })
  expect(toppingImage).toHaveLength(3)

  //Confirm alt text imgaes 
  const altText = toppingImage.map(element => element.alt)
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"])
})