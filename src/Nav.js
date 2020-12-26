import React from 'react';
import Link from './Link';

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
    <Link className="navbar-brand js-scroll-trigger" href="/">React Router - News</Link>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      Menu
      <i className="fas fa-bars" />
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link js-scroll-trigger" href="/posts">Tin tức</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link js-scroll-trigger" href="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link js-scroll-trigger" href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    );
}
