import React from "react";

import { Container, Title } from "./styles";

export function Header({title}){
  return(
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}