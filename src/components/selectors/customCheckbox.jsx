import React from "react";

import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";

export const CustomCheckbox = ({ user, statusColor, value, onChange, checked}) => {
  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={value}
      checked={checked} // Utilizamos la prop "checked" para controlar el estado del checkbox
      onChange={onChange}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{ size: "md", src: user.avatar }}  //Esto puede ser un icono de avatar
          description={
            <Link isExternal size="sm" className='text-[13px]'>
              {user.username}
            </Link>
          }
          name={user.name}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{user.role}</span>
          <Chip color={statusColor} size="sm" variant="flat">
            {user.status}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};
