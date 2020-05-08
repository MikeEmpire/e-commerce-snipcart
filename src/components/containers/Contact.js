import React from "react";

const Contact = () => (
  <div id="contact" className="section">
    {/* <div
      id="contact-map"
      className="gmap clearfix"
      data-address="Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia"
      data-zoom="10"
      data-zoom_control="true"
      data-scrollwheel="false"
    ></div> */}

    <div className="container section-content clearfix">
      <header className="content-header">
        <h1 className="content-title">Contact</h1>
        <span className="back-layer barlow" data-parallax='{"y": -40}'>
          Contact
        </span>
      </header>

      <div className="grid-row grid-row-pad-large">
        <div className="grid-6 grid-mobile-12 grid-tablet-12 col-cf">
          <h3 className="heading-2">Contact Form</h3>

          <form className="contact-form">
            <input
              type="text"
              name="name"
              id="contact-name"
              className="half"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              name="email"
              id="contact-email"
              className="half last"
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="subject"
              id="contact-subject"
              placeholder="Message Subject"
            />
            <textarea
              name="message"
              id="contact-message"
              cols="88"
              rows="6"
              placeholder="Message"
              required
            ></textarea>
            <div className="hidden">
              <label htmlFor="contact-spam-check">
                Do not fill out this field:
              </label>
              <input name="spam-check" type="text" id="contact-spam-check" />
            </div>

            <input type="submit" className="button" value="Send Email" />
          </form>
        </div>

        <div className="grid-6 grid-mobile-12 grid-tablet-12 col-contact-details">
          <p>
            <span className="contact-info">Manager</span>
            <a href="tel:+48221321321" className="barlow contact-link">
              +48 221-321-321
            </a>
            <a
              href="mailto:yourmailhere"
              className="barlow contact-link contact-email"
            >
              manager@meloo.com
            </a>
          </p>
          <p>
            <span className="contact-info">Booking</span>
            <a href="tel:+48221321321" className="barlow contact-link">
              +48 411-721-791
            </a>
            <a
              href="mailto:yourmailhere"
              className="barlow contact-link contact-email"
            >
              booking@meloo.com
            </a>
          </p>
          <p>
            <span className="contact-info">Preorder</span>
            <a href="tel:+48221321321" className="barlow contact-link">
              +48 875-121-131
            </a>
            <a
              href="mailto:yourmailhere"
              className="barlow contact-link contact-email"
            >
              preorder@meloo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
