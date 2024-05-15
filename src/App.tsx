import { useMemo, useState } from "react";

import { DisplayCard, RadioGroup, RadioGroupItem } from "./components";
import { capitalize } from "./components/utils";
import { userData, User, Role } from "./data/mock";

function App(): JSX.Element {
  const [role, setRole] = useState<Role>("Admin");

  const roles: Role[] = ["Admin", "Manager"];

  const onOptionChange = (roleOption: React.ChangeEvent<HTMLInputElement>) => {
    setRole(roleOption.target.value as Role);
  };

  const filteredUsers: User[] = useMemo(() => {
    return userData.filter(
      (user) => user.role.toLowerCase() === role.toLowerCase()
    );
  }, [role]);

  return (
    <div className="flex min-w-[320px] min-h-screen">
      <div className="w-screen min-w-48 p-12">
        <div className="border-b-2 py-6">
          <h2 className="mb-6">User Types</h2>
          <RadioGroup>
            {roles.map((roleValue, i) => (
              <RadioGroupItem
                key={i}
                id={`radio-${roleValue}-${i}`}
                value={roleValue}
                {...(role === roleValue && { checked: true })}
                defaultChecked={role === roleValue}
                onChange={onOptionChange}
              >
                {roleValue}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>
        <div className="border-b-2 py-6">
          <h2 className="mb-6">{capitalize(role)} Users</h2>
          {filteredUsers.map(
            ({ name, role }, i) =>
              !!name.length && (
                <div className="mb-3" key={i}>
                  <DisplayCard name={name} role={role} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
