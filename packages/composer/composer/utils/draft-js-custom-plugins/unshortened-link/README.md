The 'unshortened-link' plugin takes care of displaying and interacting with unshortened links.
These are links that have been shortened and then subsequently unshortened. Link that have
never been shortened use the basic Link plugin.

The plugin is made of two components:

1. UnshortenedLink.jsx: used to display unshortened links within the editor, featuring a bit
   of styling, and some mouse event handlers to let the plugin know when users
   are hovering over an unshortenedlink.

2. UnshortenedLinkTooltip.jsx: used to display a tooltip with additional info about a
   unshortened link when users hover over that unshortened link. This component is only
   rendered in one place, outside of the editor itself, so that it's insulated
   from anything contenteditable.
