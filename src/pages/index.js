
export default function Home() {
  return (
    <>
    <div className="container">
    <section className="hero">
    <h1>Elevate Your Meetup Experience with Crowd-Sourced Questions</h1>
    <p>Engage Your Audience, Spark Conversations</p>
    <button>Get Started</button>
  </section>
  <section className="features">
    <div>
      <h2>Crowd-Sourced Questions</h2>
      <p>Showcase the process of how users can submit and upvote questions for meetups.</p>
    </div>
    <div>
      <h2>Seamless Integration</h2>
      <p>Highlight how easily organizers can integrate the crowd-sourced questions into their event planning.</p>
    </div>
    <div>
      <h2>Enhanced Engagement</h2>
      <p>Emphasize the benefits of using curated questions to enhance audience engagement during meetups.</p>
    </div>
  </section>
  <section className="how-it-works">
    <h2>How It Works</h2>
    <div className="step">
      <h3>Step 1</h3>
      <p>Users submit questions or upvote existing ones.</p>
    </div>
    <div className="step">
      <h3>Step 2</h3>
      <p>Organizers review and select the most popular questions.</p>
    </div>
    <div className="step">
      <h3>Step 3</h3>
      <p>Questions are seamlessly integrated into the meetup agenda.</p>
    </div>
  </section>
  <section className="testimonials">
    <h2>Testimonials</h2>
    <div className="testimonial">
      <p>"Using this platform revolutionized our meetups! Our audience engagement skyrocketed!"</p>
    </div>
    <div className="testimonial">
      <p>"Finally, a simple way to crowdsource questions for our events. Highly recommend!"</p>
    </div>
    <div className="testimonial">
      <p>"I love how easy it is to submit questions and see them featured at our meetups. Great tool!"</p>
    </div>
  </section>
    </div>

    </>

  );
}
