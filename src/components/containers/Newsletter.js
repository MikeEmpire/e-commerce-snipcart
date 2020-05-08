import React from "react";

const Newsletter = () => (
  <div id="newsletter">
    <div class="overlay dots"></div>
    <div class="container section-content dark-bg clearfix">
      <header class="content-header">
        <h1 class="content-title">Newsletter</h1>
        <span class="back-layer barlow" data-parallax='{"y": -40}'>
          Subscribe
        </span>
      </header>
      <form action="#post" method="post" id="subscribe-form">
        <input
          type="email"
          name="subscribe_email"
          value=""
          id="subscribe-email"
          placeholder="Enter your email..."
          required
        />
        <input type="submit" value="+" class="large" id="subscribe-submit" />
      </form>
    </div>
  </div>
);

export default Newsletter
