export const PAGES = [
  { name: 'Products', route: '/products' },
  { name: 'Pricing', route: '/pricing' },
  { name: 'Blog', route: '/blogs' },
  { name: 'Admin', route: '/admin' }
];

export const SIGN_IN = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    autoComplete: 'email'
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
    autoComplete: 'current-password'
  }
];

export const SIGN_UP = [
  {
    name: 'name',
    label: 'Your Name',
    type: 'text',
    autoComplete: 'name'
  },
  {
    name: 'mobile',
    type: 'number',
    label: 'Your Mobile',
    autoComplete: 'current-password'
  },

  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    autoComplete: 'email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'password',
    autoComplete: 'current-password'
  }
];

export const SIGN_IN_FOOTER = {
  heading: 'Sign in',
  value: 'remember',
  label: 'Remember me',
  forgotPassword: 'Forgot password?',
  account: "Don't have an account? Sign Up",
  route: '/signup'
};
export const SIGN_UP_FOOTER = {
  heading: 'Sign up',
  value: 'allowExtraEmails',
  label:
    'I want to receive inspiration, marketing promotions and updates via email.',
  forgotPassword: '',
  account: 'Already have an account? Sign in',
  route: '/signin'
};
