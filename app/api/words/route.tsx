import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentUser } from '@/lib/auth';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const guestbook = await prisma.guestbook.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(guestbook, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await currentUser();

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, image, email } = token;

    const { message } = await req.json()

    const comment = await prisma.guestbook.create({
      data: {
        message,
        name: name,
        email: email,
        image: image,
        user_id: token.sub,
      },
    })

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = await currentUser();

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { comment } = await req.json();

    const isAdmin = process.env.ADMIN_EMAIL === token.email;
    const isAuthor = token.sub === comment.user_id;

    if (!isAdmin && !isAuthor) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.guestbook.delete({
      where: { id: comment.id },
    });

    return NextResponse.json({ message: 'Comment deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected error occurred.' },
      { status: 500 },
    );
  }
}