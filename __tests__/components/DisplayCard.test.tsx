import { cleanup, render, RenderResult } from "@testing-library/react";

import { DisplayCard } from "../../src/components";

describe("DisplayCard", () => {
  let renderDisplayCard: () => RenderResult;
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    renderDisplayCard = () =>
      render(<DisplayCard name="John Doe" role="Manager" />);
  });
  afterEach(cleanup);

  it("renders name successfully", () => {
    const { getByLabelText } = renderDisplayCard();
    const name = getByLabelText("name");
    expect(name).toHaveTextContent("John Doe");
  });

  it("renders role successfully", () => {
    const { getByLabelText } = renderDisplayCard();
    const role = getByLabelText("role");
    expect(role).toHaveTextContent("Manager");
  });

  it("renders initials successfully", () => {
    const { getByLabelText } = renderDisplayCard();
    const role = getByLabelText("initials");
    expect(role).toHaveTextContent("J");
  });
});
