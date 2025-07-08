import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false }: DummyProps) {
  return <H1>{text}</H1>;
}

function App() {
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {};

  return (
    <Container>
      <H1>protected</H1>
      <Dummy text="hello" active={true} />
      <form>
        <button onClick={onClick}>Click Me</button>
      </form>
    </Container>
  );
}

export default App;