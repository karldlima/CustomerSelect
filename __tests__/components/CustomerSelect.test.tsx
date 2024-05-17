import { cleanup, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CustomerSelect from "../../src/CustomerSelect";
import { Role, Customer } from "../../src/graphql";

const roles = [
  { name: "Admin", value: "ADMIN" as Role },
  { name: "Manager", value: "MANAGER" as Role },
];

const customers: Customer[] = [
  {
    email: "john@example.com",
    id: "123",
    name: "John Doe",
    role: "ADMIN",
  },
  {
    email: "jane@example.com",
    id: "456",
    name: "Jane Smith",
    role: "MANAGER",
  },
  {
    email: "bob@example.com",
    id: "789",
    name: "Bob Johnson",
    role: "MANAGER",
  },
  {
    email: "alice@example.com",
    id: "101112",
    name: "Alice Brown",
    role: "ADMIN",
  },
  {
    email: "david@example.com",
    id: "131415",
    name: "David Lee",
    role: "MANAGER",
  },
  {
    email: "emily@example.com",
    id: "161718",
    name: "Emily Wilson",
    role: "MANAGER",
  },
];

describe("CustomerSelect", () => {
  let renderCustomerSelect: () => RenderResult;
  beforeEach(async () => {
    renderCustomerSelect = () =>
      render(
        <CustomerSelect
          roles={roles}
          customers={customers}
          defaultRole="MANAGER"
        />
      );
  });
  afterEach(cleanup);

  it("renders successfully", () => {
    const { container } = renderCustomerSelect();
    expect(container).toBeInTheDocument();
  });

  it("renders roles successfully", () => {
    const { getAllByRole, getByLabelText } = renderCustomerSelect();

    expect(getAllByRole("radio")).toHaveLength(2);
    expect(getByLabelText("Admin")).toBeInTheDocument();
    expect(getByLabelText("Manager")).toBeInTheDocument();
  });

  it("renders correct amount of customers with manager role", () => {
    const { getAllByLabelText } = renderCustomerSelect();

    expect(getAllByLabelText("name")).toHaveLength(4);
  });

  it("renders customers with admin role successfully", async () => {
    const { queryByText, getByLabelText, getAllByLabelText } =
      renderCustomerSelect();

    expect(queryByText("John Doe")).not.toBeInTheDocument();
    expect(queryByText("Alice Brown")).not.toBeInTheDocument();
    expect(getAllByLabelText("name")).toHaveLength(4);

    await userEvent.click(getByLabelText("Admin"));

    expect(queryByText("John Doe")).toBeInTheDocument();
    expect(queryByText("Alice Brown")).toBeInTheDocument();
    expect(getAllByLabelText("name")).toHaveLength(2);
  });

  it("renders no results message", () => {
    const { queryByText } = render(
      <CustomerSelect roles={roles} customers={[]} defaultRole="ADMIN" />
    );

    expect(queryByText("Please refine search")).toBeInTheDocument();
  });
});
