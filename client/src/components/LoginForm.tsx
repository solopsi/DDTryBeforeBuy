import { useState } from "react";
import { Button, Input, InputPassword } from "vienna-ui";
import styled from "styled-components";
import RaiffeisenLogo from "./RaiffeisenLogo";

interface LoginFormProps {
  onLogin?: (email: string, password: string, role: 'buyer' | 'supplier') => void;
  error?: string | null;
}

const SplitScreenContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BrandingPanel = styled.div`
  background: linear-gradient(135deg, hsl(45 100% 50%) 0%, hsl(45 90% 45%) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 32px;
  color: hsl(0 0% 8%);
  
  @media (max-width: 768px) {
    min-height: 200px;
    padding: 24px;
  }
`;

const BrandingContent = styled.div`
  text-align: center;
  max-width: 400px;
`;

const BrandingTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
  color: hsl(0 0% 8%);
`;

const BrandingSubtitle = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
  color: hsl(0 0% 20%);
`;

const FormPanel = styled.div`
  background: hsl(0 0% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const TabsSection = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: hsl(0 0% 64%);
  margin-bottom: 32px;
  justify-content: center;
  border-bottom: 1px solid hsl(0 0% 88%);
  padding-bottom: 16px;
`;

const TabItem = styled.span<{ $active?: boolean }>`
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.$active ? 'hsl(45 100% 50%)' : 'transparent'};
  color: ${props => props.$active ? 'hsl(0 0% 8%)' : 'hsl(0 0% 64%)'};
  font-weight: ${props => props.$active ? '500' : '400'};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.$active ? 'hsl(0 0% 8%)' : 'hsl(0 0% 45%)'};
  }
`;

const CardHeader = styled.div`
  margin-bottom: 24px;
`;

const CardTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  color: hsl(0 0% 8%);
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: hsl(0 0% 64%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: hsl(0 0% 8%);
`;


const ForgotPassword = styled.div`
  text-align: center;
  margin: 8px 0;
`;

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: hsl(45 100% 50%);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background-color: hsl(0 84% 95%);
  border: 1px solid hsl(0 84% 80%);
  color: hsl(0 84% 40%);
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
`;

type TabType = 'buyers' | 'suppliers';

export default function LoginForm({ onLogin, error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>('buyers');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = activeTab === 'buyers' ? 'buyer' : 'supplier';
    onLogin?.(email, password, role);
  };

  return (
    <SplitScreenContainer>
      <BrandingPanel>
        <BrandingContent>
          <RaiffeisenLogo />
          <BrandingTitle>DD Try Before Buy</BrandingTitle>
          <BrandingSubtitle>
            Платформа динамического дисконтирования для эффективного управления закупками
          </BrandingSubtitle>
        </BrandingContent>
      </BrandingPanel>
      
      <FormPanel>
        <FormContainer>
          <TabsSection>
            <TabItem 
              $active={activeTab === 'buyers'} 
              onClick={() => setActiveTab('buyers')}
            >
              Для покупателей
            </TabItem>
            <TabItem 
              $active={activeTab === 'suppliers'} 
              onClick={() => setActiveTab('suppliers')}
            >
              Для поставщиков
            </TabItem>
          </TabsSection>
          
          <CardHeader>
            <CardTitle>Вход</CardTitle>
            <CardDescription>
              На платформу динамического дисконтирования
            </CardDescription>
          </CardHeader>
          
          <Form onSubmit={handleSubmit}>
            {error && (
              <ErrorMessage data-testid="error-message">
                {error}
              </ErrorMessage>
            )}
            
            <FormField>
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                data-testid="input-email"
                required
              />
            </FormField>
            
            <FormField>
              <Label htmlFor="password">Пароль</Label>
              <InputPassword
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </FormField>
            
            <ForgotPassword>
              <ForgotPasswordLink 
                href="#"
                data-testid="link-forgot-password"
              >
                Не помню пароль
              </ForgotPasswordLink>
            </ForgotPassword>
            
            <Button 
              type="submit"
              design="accent"
              data-testid="button-login"
              style={{ width: '100%' }}
            >
              Войти
            </Button>
          </Form>
        </FormContainer>
      </FormPanel>
    </SplitScreenContainer>
  );
}