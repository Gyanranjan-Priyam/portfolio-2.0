import ScatterReveal from '@src/components/animationComponents/scatterReveal/Index';

function ScatterQuote() {
  return (
    <ScatterReveal
      quoteClass="pricedown-text"
      quote={
        <>
          The full-stack developer&apos;s role is like a kind host,{' '}
          <span className="medium">ensuring</span> visitors have a{' '}
          <span className="medium">smooth</span> and{' '}
          <span className="medium">enjoyable</span> experience.
        </>
      }
    />
  );
}

export default ScatterQuote;
