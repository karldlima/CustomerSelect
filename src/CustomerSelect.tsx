import { useMemo, useState } from "react";

import { DisplayCard, RadioGroup, RadioGroupItem } from "./components";
import { capitalize } from "./components/utils";
import { Customer, Role } from "./graphql";

interface CustomerSelectProps {
  customers: Customer[];
  roles: { name: string; value: Role }[];
  defaultRole: Role;
}

function CustomerSelect({
  customers,
  roles,
  defaultRole,
}: CustomerSelectProps): JSX.Element {
  const [role, setRole] = useState<Role>(defaultRole);

  const onOptionChange = (roleOption: React.ChangeEvent<HTMLInputElement>) => {
    setRole(roleOption.target.value as Role);
  };

  const filteredCustomers: Customer[] = useMemo(() => {
    return customers.filter((customer) => customer.role === role);
  }, [role, customers]);

  return (
    <div className="flex min-w-[320px] min-h-screen">
      <div className="w-screen min-w-48 p-12">
        <section className="border-b-2 pb-6">
          <header>
            <h2 className="mb-6" id="user-types-heading">
              User Types
            </h2>
          </header>
          {roles?.length ? (
            <RadioGroup aria-describedby="user-types-heading">
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
          ) : (
            <h4>No user types available</h4>
          )}
        </section>
        <section className="border-b-2 py-6">
          <header>
            <h2 className="mb-6" id="users-heading">
              {capitalize(role)} Users
            </h2>
          </header>
          <div aria-describedby="users-heading">
            {filteredCustomers?.length ? (
              filteredCustomers.map(
                ({ name, role }, i) =>
                  !!name.length && (
                    <div className="mb-3" key={i} aria-label="user">
                      <DisplayCard name={name} role={role} />
                    </div>
                  )
              )
            ) : (
              <h4>Please refine search</h4>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CustomerSelect;
