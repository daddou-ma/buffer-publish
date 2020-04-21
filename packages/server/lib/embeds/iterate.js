const iterateScript = `<script>
    window.iterateSettings = {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55X2lkIjoiNWQ1ZjIxMzUxMzU5ZDMwMDAxMDE3N2IxIiwiaWF0IjoxNTY2NTE1NTA5fQ.UPeBAlcqV4aZQ_rJxRIkYWpNC1nDS24O1MG4WIEuuUg'
    };
    (function(i,t,e,r,a){if(t.getElementById(r))
    {return}
    i.IterateObjectName=a;var z=function()
    {z.c(arguments)};
    z.q=[];z.c=function(args){z.q.push(args)};i[a]=z;var js,fjs=t.getElementsByTagName(e)[0];
    function l() {js=t.createElement(e);js.id=r;js.async=1;js.src="https://platform.iteratehq.com/loader.js";fjs.parentNode.insertBefore(js,fjs)}; if(t.readyState==="complete") {l();} else
    if(i.attachEvent) {i.attachEvent('onload', l);} else{i.addEventListener('load', l, false);}}(window, document,'script','iterate-js','Iterate'));
  </script>`;

module.exports = ({ isProduction }) => (isProduction ? iterateScript : '');
