The highlighter plugin is a very simple one that highlights text in the editor
that goes over the optional character limit.

The plugin itself is simple, but a few other things surrounding it have to be a
certain way for it to work great:

- We need the editor to only ever have one block,
so we use soft new lines.

- We need the highlighter's decorator to be re-rendered whenever the character count
  changes. Most changes come from within the editor itself: typing, pasting text;
  in those cases the decorator is re-applied immediately, which works great. In other
  cases, changes to the character count originate from outside the editor: attaching
  an image, a video, a link... In these cases the editor will have no reason to
  re-render its decorators, so we do that ourselves by passing down a prop through
  Composer and Editor, which will then call a method that does just that on the
  PluginEditor instance.
