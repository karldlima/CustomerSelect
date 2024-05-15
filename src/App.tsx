import { useState } from "react";

import { RadioGroup, RadioGroupItem, RadioOption } from "./components";

function App(): JSX.Element {
  const [role, setRole] = useState<string>("admin");

  const onOptionChange = (roleOption: React.ChangeEvent<HTMLInputElement>) => {
    setRole(roleOption.target.value);
  };

  const roles: RadioOption[] = [
    { value: "admin", name: "Admin" },
    { value: "manager", name: "Manager" },
  ];
  return (
    <div className="flex min-w-[320px] min-h-screen">
      <div className="w-screen p-12">
        <h2 className="mb-6">User Types</h2>
        <RadioGroup>
          {roles.map(({ value, name }, i) => {
            return (
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
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}

export default App;
