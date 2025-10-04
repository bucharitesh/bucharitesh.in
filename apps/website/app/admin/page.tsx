import ApproveButton from './approve-button';

import { auth } from '@/lib/auth';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="h-screen bg-gray-1 p-12 text-gray-12">
      <h1>Welcome to the gang page</h1>
      <p>Only authenticated users can access this page.</p>
      <div
        className="mt-6 grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        <GuestbookEntries />
      </div>
    </div>
  );
}

const colorMap = new Map();
const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow'];

// we gotta improve this a bit to be easier to scan
function getColor(id: string) {
  if (!colorMap.has(id)) {
    const color = colors[colorMap.size % colors.length];
    colorMap.set(id, color);
  }
  return colorMap.get(id);
}

async function GuestbookEntries() {
  const { rows } =
    await sql`SELECT * from "guestbook" WHERE approved = false ORDER BY id DESC;`;

  return rows.map((entry) => (
    <div key={entry.id} className="h-fit w-fit border border-gray-10 p-2">
      <div className="flex items-center justify-center overflow-hidden rounded-[3px] border border-gray-6 bg-gray-3">
        <div
          className="object-contain"
          dangerouslySetInnerHTML={{ __html: entry.signature }}
        />
      </div>
      <div className="mt-1.5 w-full break-words text-sm">
        <span className="mr-1 font-semibold text-[14px] text-gray-12">
          {entry.created_by}
        </span>
        <div className="font-medium text-[16px]">{entry.body}</div>
      </div>
      <div className="flex flex-col">
        <span>
          {entry.hascreatedentrybefore ? 'has created an entry before' : 'new'}
        </span>

        {entry.local_created_by_id && (
          <span style={{ color: getColor(entry.local_created_by_id) }}>
            created by: {entry.local_created_by_id}
          </span>
        )}
      </div>
      <ApproveButton id={entry.id} />
    </div>
  ));
}
