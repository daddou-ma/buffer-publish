The 'short-link' plugin takes care of displaying and interacting with short links.

The plugin is made of two components:

1. ShortLink.jsx: used to display short links within the editor, featuring a bit
   of styling, and some mouse event handlers to let the plugin know when users
   are hovering over a shortlink.

2. ShortLinkTooltip.jsx: used to display a tooltip with additional info about a
   short link when users hover over that short link. This component is only
   rendered in one place, outside of the editor itself, so that it's insulated
   from anything contenteditable.
