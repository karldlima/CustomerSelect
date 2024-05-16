import { useEffect, useMemo, useState } from "react";

import { DisplayCard, RadioGroup, RadioGroupItem } from "./components";
import { capitalize } from "./components/utils";
import { User, Role, fetchCustomers } from "./graphql";

function App(): JSX.Element {
  const [role, setRole] = useState<Role>("ADMIN");
  const [customers, setCustomers] = useState<User[]>([]);

  const roles = [
    { name: "Admin", value: "ADMIN" },
    { name: "Manager", value: "MANAGER" },
  ];

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    try {
      const custData: User[] = await fetchCustomers();
      setCustomers(custData);
    } catch (err) {
      // Error handling
    }
  }

  console.log("customers: ", customers);

  const onOptionChange = (roleOption: React.ChangeEvent<HTMLInputElement>) => {
    setRole(roleOption.target.value as Role);
  };

  const filteredUsers: User[] = useMemo(() => {
    return customers.filter((user) => user.role === role);
  }, [role, customers]);

  return (
    <div className="flex min-w-[320px] min-h-screen">
      <div className="w-screen min-w-48 p-12">
        <div className="border-b-2 py-6">
          <h2 className="mb-6">User Types</h2>
          <RadioGroup>
            {roles.map(({ name, value }, i) => (
              <RadioGroupItem
                key={i}
                id={`radio-${value}-${i}`}
                value={value}
                {...(role === value && { checked: true })}
                defaultChecked={role === value}
                onChange={onOptionChange}
              >
                {name}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>
        <div className="border-b-2 py-6">
          <h2 className="mb-6">{capitalize(role)} Users</h2>
          {!!filteredUsers?.length ? (
            filteredUsers.map(
              ({ name, role }, i) =>
                !!name.length && (
                  <div className="mb-3" key={i}>
                    <DisplayCard name={name} role={role} />
                  </div>
                )
            )
          ) : (
            <h4>Please refine search</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
