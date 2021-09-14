import {render, fireEvent} from "@testing-library/react";

import Button from "./BUtton" => imported a component, any component

//checks whether a component is rendered or not
it("checkButtonRender"), ()=> {
const {queryByTitle}= render(<Button/>);
const btn= queryByTitle("dummyButton);
expect(btn).toBeTruthy
}

//it just says there's this event,
//describe describes that event.
describe("clickButton", ()=>{
it("onClick", ()=>{
const {queryByTitle}= render(<Button/>);
const btn= queryByTitle("dummyButton);
//state before the fire event
expect(btn.innerHTML).toBe("Press Here");
//fire event
fireEvent.click(btn)
//state after the fire event
expect(btn.innerHTML).toBe("Button Clicked");
})

})

import Search from "./Search" (another component)

describe("changeInput", ()=>{
it("onChange", ()=>{
const {queryByTitle} = render(<Search/>);
const input = queryByTitle("dummySearch");
//title veriyo yani adam JSXte
fireEvent.change(input, {target: {value: "testValue(or a text we've given"}});
})
})
