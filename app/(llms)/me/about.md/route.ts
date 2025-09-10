import { USER } from '@/config/user';

const content = `# About

${USER.description.trim()}

## Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.name}
- Location: ${USER.location}
- Website: ${USER.website}

## Social Links

${Object.entries(USER.social)
  .map(([key, value]) => `- [${key}](${value})`)
  .join('\n')}

\n`;

export const dynamic = 'force-static';

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  });
}
