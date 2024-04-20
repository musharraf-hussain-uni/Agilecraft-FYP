import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(function Textbox(
  { type, placeholder, label, className, name, value, onChange },
  ref
) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-indigo-900 font-bold border px-2 py-1 mb-1 max-w-fit bg-slate-100 rounded-full"
        >
          {label}
        </label>
      )}

      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onChange}
          className={clsx(
            "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-white outline-none text-base focus:ring-2 ring-blue-300 placeholder:text-gray-300",
            className
          )}
        />
      </div>
    </div>
  );
});

Textbox.displayName = "Textbox";

export default Textbox;
