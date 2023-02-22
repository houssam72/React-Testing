import React from "react";
import { GreetProps } from "./Greet"

export const Greet = (props: GreetProps) => {
  return <div>Hello {props.name}</div>
};
