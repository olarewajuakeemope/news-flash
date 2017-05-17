import React from 'react';

/**
 * This Component contains the elements that make up the footer for this app.
 * @return {ReactComponent|null|false} - A Component for DOM rendering.
 * Otherwise, return null or false to prevent the rendering of this Component.
 */
export default function FooterContainer() {
  return (
    <div id="footer-container" className="row">
      <div>
        <h5 className="text-center">(&#8580;) Copyleft&nbsp;
          {new Date().getFullYear()}. All rights&nbsp;
          <a href="https://en.wikipedia.org/wiki/MIT_License">not&nbsp;
          reserved</a>. Created with &#10084; by&nbsp;
          <a href="https://google.com/search/Opeyemi+Olarewaju">Opeyemi&nbsp;
          Oladipo</a> using&nbsp;
          <a href="https://facebook.github.io/react/">React</a> and&nbsp;
          the <a href="https://newsapi.org/">NewsAPI</a>.
        </h5>
      </div>
    </div>
  );
}
