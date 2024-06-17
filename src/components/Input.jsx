import React from "react";
import { Container } from "react-bootstrap";
import { validate } from "uuid";

export const Input = ({ props }) => {
  //   const validText = validation(props.valueType);

  return (
    <Container isValid={props.valid}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <div>Input</div>
    </Container>
  );
};
