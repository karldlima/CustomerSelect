interface DisplayCardProps {
  name: string;
  role: string;
}

export const DisplayCard = ({ name, role }: DisplayCardProps): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div
          className="text-blue-600 bg-blue-100 w-10 h-10 rounded-md flex justify-center items-center leading-5"
          aria-label="initials"
        >
          {name[0]}
        </div>
        <div>
          <h4 aria-label="name">{name}</h4>
          <h5 aria-label="role">{role}</h5>
        </div>
      </div>
    </div>
  );
};
DisplayCard.displayName = "DisplayCard";
