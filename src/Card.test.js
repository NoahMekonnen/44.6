import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("it renders", function(){
  render(<Card/>)
})

it("should match snapshot", function(){
    const { asFragment } = render(<Card caption="sea" src="image1.png" currNum={1} totalNum={3}/>)
    expect(asFragment()).toMatchSnapshot()
})