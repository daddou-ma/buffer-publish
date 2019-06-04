import Link from './Link';
import linkStrategy from './linkStrategy';

const createLinkPlugin = () => ({
  decorators: [
    {
      strategy: linkStrategy,
      component: Link,
    },
  ],
});

export default createLinkPlugin;
