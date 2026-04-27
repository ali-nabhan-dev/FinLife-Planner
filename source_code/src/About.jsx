import React from 'react';
import styled from 'styled-components';

const About = () => {
    return (
        <AboutContainer>
            <Section>
                <h1>About FINLIFE Planner</h1>
                <p>
                    At FINLIFE Planner, our mission is to help you take control of your finances, pay your bills on time, and achieve your financial goals with ease.
                </p>
            </Section>

            <Section>
                <h2>Why Choose FINLIFE Planner?</h2>
                <p>
                    Unlike other budget planners, FINLIFE Planner focuses on daily budgeting and task management, ensuring you stay on top of your finances every single day.
                </p>
            </Section>

            <Section>
                <h2>Key Features</h2>
                <ul>
                    <li>Create daily budgets tailored to your tasks.</li>
                    <li>Track your expenses in real-time.</li>
                    <li>Set financial goals and monitor your progress.</li>
                    <li>Get reminders for upcoming bills and payments.</li>
                </ul>
            </Section>

            <Section>
                <h2>How It Works</h2>
                <ol>
                    <li>Sign up for a free account.</li>
                    <li>Set your daily budget and financial goals.</li>
                    <li>Start tracking your expenses and tasks.</li>
                    <li>Watch your financial health improve!</li>
                </ol>
            </Section>

            <Section>
                <h2>Success Stories</h2>
                <blockquote>
                    "Since using FINLIFE Planner, I've been able to pay off $5,000 in debt and save for my dream vacation!" � Sarah, User since 2023.
                </blockquote>
            </Section>

            <Section>
                <h2>Meet the Team</h2>
                <p>
                    We're a passionate team of financial experts, developers, and designers dedicated to helping you achieve financial freedom.
                </p>
                <TeamGrid>
                    <TeamMember>
                        <h3>John Doe</h3>
                        <p>Co-Founder & CEO</p>
                    </TeamMember>
                    <TeamMember>
                        <h3>Jane Smith</h3>
                        <p>Lead Developer</p>
                    </TeamMember>
                    <TeamMember>
                        <h3>Emily Brown</h3>
                        <p>Financial Advisor</p>
                    </TeamMember>
                </TeamGrid>
            </Section>

            <Section>
                <h2>FAQs</h2>
                <FAQItem>
                    <h3>Is FINLIFE Planner free to use?</h3>
                    <p>Yes, we offer a free plan with basic features. For advanced features, you can upgrade to our premium plan.</p>
                </FAQItem>
                <FAQItem>
                    <h3>How do I get started?</h3>
                    <p>Simply sign up for an account, set your budget, and start tracking your expenses!</p>
                </FAQItem>
            </Section>
        </AboutContainer>
    );
};

export default About;

// Styled Components
const AboutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Section = styled.section`
  margin-bottom: 40px;
  h1, h2, h3 {
    color: #333;
  }
  p, li {
    color: #555;
    line-height: 1.6;
  }
  ul, ol {
    padding-left: 20px;
  }
  blockquote {
    background: #f9f9f9;
    border-left: 5px solid #0fd850;
    margin: 20px 0;
    padding: 10px 20px;
    font-style: italic;
    color: #555;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TeamMember = styled.div`
  text-align: center;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  h3 {
    margin: 0;
    color: #333;
  }
  p {
    margin: 5px 0 0;
    color: #777;
  }
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
  h3 {
    margin: 0 0 10px;
    color: #333;
  }
  p {
    margin: 0;
    color: #555;
  }
`;