import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RadioGroup, RadioGroupItem } from "../../src/components";

const options = [
  { label: "Label 1", value: "value01" },
  { label: "Label 2", value: "value02" },
];

describe("RadioGroup", () => {
  let renderRadioGroup: () => RenderResult;
  beforeEach(() => {
    renderRadioGroup = () =>
      render(
        <RadioGroup>
          {options.map(({ label, value }, i) => (
            <RadioGroupItem
              key={i}
              id={`radio-${value}`}
              value={value}
              onChange={() => {}}
              data-testid={`test-radio-${value}`}
            >
              {label}
            </RadioGroupItem>
          ))}
        </RadioGroup>
      );
  });
  afterEach(cleanup);

  it("renders successfully", () => {
    const { container } = renderRadioGroup();
    expect(container).toBeInTheDocument();
  });

  it("first option is checked when clicked by user", async () => {
    const { getByLabelText } = renderRadioGroup();
    const optionOne = getByLabelText("Label 1");
    const optionTwo = getByLabelText("Label 2");

    expect(optionOne).not.toBeChecked();
    expect(optionTwo).not.toBeChecked();
    await userEvent.click(getByLabelText("Label 1"));
    expect(optionOne).toBeChecked();
    expect(optionTwo).not.toBeChecked();
  });

  it("is accessible with keys", async () => {
    const { getByTestId } = renderRadioGroup();
    const optionTwo = getByTestId("test-radio-value02");

    expect(optionTwo).not.toBeChecked();
    expect(optionTwo).not.toHaveFocus();
    await userEvent.tab();
    await userEvent.keyboard("[ArrowDown]");

    expect(optionTwo).toHaveFocus();
    expect(optionTwo).toBeChecked();
  });
});
