import type { SVGProps } from 'react'

type IconName = 'arrow-left' | 'arrow-right' | 'briefcase' | 'calendar' | 'check' | 'code' | 'heart' | 'palette' | 'search' | 'speaker' | 'users'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

const paths: Record<IconName, string> = {
  'arrow-left': 'M19 12H5m6 6-6-6 6-6',
  'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
  briefcase: 'M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-10 0h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm0 5h14',
  calendar: 'M6 3v3m12-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z',
  check: 'm5 12 4 4L19 6',
  code: 'm8 9-3 3 3 3m8-6 3 3-3 3m-2-10-4 14',
  heart: 'M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.8 1.8Z',
  palette: 'M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6h-.8a1.8 1.8 0 0 1 0-3.6H15a6 6 0 0 0 0-10.8A9 9 0 0 0 12 3Z',
  search: 'm21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z',
  speaker: 'M4 14h3l4 3V7L7 10H4v4Zm11 2a5 5 0 0 0 0-6m2 8a8 8 0 0 0 0-10',
  users: 'M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1m6-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 1a3 3 0 0 0 0-6m4 14v-1a4 4 0 0 0-3-3.9',
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 24 24" {...props}>
      <path d={paths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}
