import React from "react";
import PropTypes from "prop-types";
import Style from "src/components/css/Login.module.css";
import { courses } from "src/utils/subject";

const FormInput = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
}) => (
  <div className={Style.formgroup}>
    <label htmlFor={id}>{label}</label>
    <select
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      required
      autoComplete="off"
    >
        <option value="" hidden disabled>select...</option>
      {courses.map((data, i) => {
        return <option key={i}>{data}</option>;
      })}
    </select>
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default FormInput;
