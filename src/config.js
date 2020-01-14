export default {
  title: 'Dashboard',
  path: '/',
  children: [
    {
      title: 'Builder',
      path: '/builder',
      children: [
        {
          title: 'Name',
          path: '/builder/name',
          body: 'What is your name?',
        },
        {
          title: 'Story',
          path: '/builder/story',
          body: 'Set the story content here.',
        },
      ],
    },
    {
      title: 'Settings',
      path: '/settings',
      children: [
        {
          title: 'Language',
          path: '/settings/language',
          body: 'Set the language here.',
        },
        {
          title: 'Billing',
          path: '/settings/billing',
          body: 'Set the billing here.',
          children: [
            {
              title: 'Stripe',
              path: '/settings/billing/stripe',
              body: 'Stripe settings',
            },
          ],
        },
      ],
    },
  ],
};
