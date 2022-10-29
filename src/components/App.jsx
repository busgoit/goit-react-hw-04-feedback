import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedbacks = ['good', 'neutral', 'bad'];

  const incrementFeedback = e => {
    switch (e.currentTarget.dataset.set) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        console.log('There is no such option');
        return;
    }
  };

  const totalFeedback = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    if (totalFeedback === 0) return 0;

    const positiveFeedback = good / totalFeedback;
    const positiveFeedbackPercentage = (positiveFeedback * 100).toFixed(0);

    return Number(positiveFeedbackPercentage);
  };

  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedbacks}
          onLeaveFeedback={incrementFeedback}
        />
      </Section>
      {totalFeedback === 0 ? (
        <Section>
          <Notification message="There is no feedback" />
        </Section>
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        </Section>
      )}
    </>
  );
};
