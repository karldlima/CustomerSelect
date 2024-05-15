import * as React from "react";
import { clsx } from "clsx";

export interface RadioOption {
  value: string;
  name: string;
}

interface RadioGroupProps extends React.HTMLProps<HTMLUListElement> {
  ref?: React.Ref<HTMLUListElement>;
}

const RadioGroup = React.forwardRef<HTMLUListElement, RadioGroupProps>(
  ({ ...props }, ref): JSX.Element => {
    return (
      <ul
        className="w-48 text-sm font-medium text-gray-900"
        {...props}
        ref={ref}
      />
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  ref?: React.Ref<HTMLInputElement>;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ id, checked, children, ...props }, ref): JSX.Element => {
    return (
      <li className="w-full rounded-t-lg">
        <div
          className={clsx(
            "flex items-center ps-3 rounded-lg",
            checked && "bg-blue-100"
          )}
        >
          <input
            ref={ref}
            id={id}
            type="radio"
            name="radio"
            className="w-4 h-4 text-blue-600"
            {...props}
          />
          <label
            htmlFor={id}
            className="w-full py-3 ms-3 text-base font-normal"
          >
            {children}
          </label>
        </div>
      </li>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
