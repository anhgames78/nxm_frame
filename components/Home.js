import React, { PropTypes } from 'react';
import Link from '../src/Link';

const Home = () => {
    return (
        <div>
  <header className="masthead">
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-lg-7 my-auto">
          <div className="header-content mx-auto">
            <h1 className="mb-5">New Age is an app landing page that will help you beautifully showcase your new mobile app, or anything else!</h1>
            <Link href="/posts" className="btn btn-outline btn-xl js-scroll-trigger">Các tin chính.</Link>
          </div>
        </div>
        <div className="col-lg-5 my-auto">
          <div className="device-container">
            <div className="device-mockup iphone6_plus portrait white">
              <div className="device">
                <div className="screen">
                  {/* Demo image for screen mockup, you can put an image here, some HTML, an animation, video, or anything else! */}
                  <img src="https://startbootstrap.github.io/startbootstrap-new-age/img/demo-screen-1.jpg" className="img-fluid" alt="" />
                </div>
                <div className="button">
                  {/* You can hook the "home button" to some JavaScript events or just remove it */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <section className="download bg-primary text-center" id="download">
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h2 className="section-heading">Discover what all the buzz is about!</h2>
        </div>
      </div>
    </div>
  </section>
  <section className="contact bg-primary" id="contact">
    <div className="container">
      <h2>We
        <i className="fas fa-heart" />
        new friends!</h2>
      <ul className="list-inline list-social">
        <li className="list-inline-item social-twitter">
          <a href="https://twitter.com">
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li className="list-inline-item social-facebook">
          <a href="https://facebook.com">
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li className="list-inline-item social-google-plus">
          <a href="https://google.com">
            <i className="fab fa-google-plus-g" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</div>

    );
};

export default Home;