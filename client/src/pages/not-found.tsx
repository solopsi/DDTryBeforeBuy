import styled from "styled-components";
import { WarningTrIcon } from "vienna.icons";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(0 0% 98%);
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 16px;
  padding: 24px;
  background: hsl(0 0% 100%);
  border: 1px solid hsl(0 0% 88%);
  border-radius: 8px;
  box-shadow: 0 1px 3px hsla(0 0% 0% / 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: hsl(0 0% 40%);
`;

export default function NotFound() {
  return (
    <Container>
      <Card>
        <Header>
          <WarningTrIcon style={{ width: '32px', height: '32px', color: 'hsl(0 70% 50%)' }} />
          <Title>404 Page Not Found</Title>
        </Header>
        <Description>
          Did you forget to add the page to the router?
        </Description>
      </Card>
    </Container>
  );
}
