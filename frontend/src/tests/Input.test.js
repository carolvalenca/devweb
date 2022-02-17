import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect"

import Input from "../components/Input";

let container = null;
beforeEach(() => {
  // Configura um elemento do DOM como alvo do teste
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a label", () => {
    act(() => {
        render(<Input />, container);
    });
    expect(container.textContent).toBe("");

    act(() => {
        render(<Input label="Name" />, container);
    });
    expect(container.textContent).toBe("Name");

    act(() => {
        render(<Input label="Address" />, container);
    });
    expect(container.textContent).toBe("Address");
});

it("should render an input with label", () => {
  act(() => {
    render(<Input />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <p></p><input type=\\"text\\" value=\\"\\">
    </div>"
  `); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Input label="Name" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <p>Name</p><input type=\\"text\\" value=\\"\\">
    </div>"
  `); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Input label="Address" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <p>Address</p><input type=\\"text\\" value=\\"\\">
    </div>"
  `); /* ... gets filled automatically by jest ... */
});

it("should change the input value", () => {
    act(() => {
        render(<Input label="Name" />, container);
    });
    userEvent.type(container.querySelector('input'), "Caroliny Regina");
    expect(container.querySelector('input')).toHaveValue("Caroliny Regina");
});
