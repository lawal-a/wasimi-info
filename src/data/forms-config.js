/**
 * Google Form URLs — public links, not secrets.
 * Replace each placeholder with your actual Google Form short URL.
 * Create forms at: https://forms.google.com
 */
export const FORMS = {
  pledge:    import.meta.env.VITE_FORM_PLEDGE    ?? 'https://forms.gle/PLACEHOLDER_PLEDGE',
  volunteer: import.meta.env.VITE_FORM_VOLUNTEER ?? 'https://forms.gle/PLACEHOLDER_VOLUNTEER',
  refer:     import.meta.env.VITE_FORM_REFER     ?? 'https://forms.gle/PLACEHOLDER_REFER',
  subscribe: import.meta.env.VITE_FORM_SUBSCRIBE ?? 'https://forms.gle/PLACEHOLDER_SUBSCRIBE',
  give:      import.meta.env.VITE_FORM_GIVE      ?? 'https://forms.gle/PLACEHOLDER_GIVE',
}
