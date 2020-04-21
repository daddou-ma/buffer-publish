/**
 * Segment Library for Metrics / Tracking
 */

// @todo: We should store these in ENV vars instead
const segmentKeys = {
  local: 'qsP2UfgODyoJB3px9SDkGX5I6wDtdQ6a',
  production: '9Plsiyvw9NEgXEN7eSBwiAGlHD3DHp0A',
};

module.exports = ({ isProduction }) => {
  const segmentKey = isProduction ? segmentKeys.production : segmentKeys.local;
  return `<script>
      window.PRODUCT_TRACKING_KEY = 'publish';
      window.CLIENT_NAME = 'publishWeb';
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
        analytics.load("${segmentKey}");
      }}();
    </script>`;
};
