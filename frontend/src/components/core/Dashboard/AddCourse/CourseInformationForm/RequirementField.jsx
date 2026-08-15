import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      //setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label} <sup className="text-red-400">*</sup>
      </label>

      {/* Input Field + Add Button */}
      <div className="flex gap-x-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-black focus:border-yellow-400 focus:outline-none"
          placeholder="Enter requirement"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="rounded-md bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-600"
        >
          Add
        </button>
      </div>

      {/* Requirement List */}
      {requirementList.length > 0 && (
        <ul className="mt-2 space-y-2">
          {requirementList.map((requirement, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-gray-700 px-3 py-2 text-white"
            >
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-gray-300 hover:text-red-400"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error Handling */}
      {errors[name] && (
        <span className="text-xs text-red-400">{label} is required</span>
      )}
    </div>
  );
};

export default RequirementField;
