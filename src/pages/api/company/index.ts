import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import slugify from 'slugify'
import prisma from '~/utils/prisma'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const cursor = req.query.cursor as string
    let orderBy: Prisma.Enumerable<Prisma.CompanyOrderByWithRelationInput>

    if (req.query.sort === 'jobs') {
      orderBy = { jobs: { _count: 'desc' } }
    } else if (req.query.sort === 'reviews') {
      orderBy = { reviews: { _count: 'desc' } }
    } else {
      orderBy = { createdAt: 'desc' }
    }

    const companies = await prisma.company.findMany({
      take: 32,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      select: {
        id: true,
        name: true,
        logo: true,
        slug: true,
        _count: true
      },
      orderBy,
      where: {
        name: {
          contains: (req.query.search as string) || undefined
        },
        jobs: {
          none: {
            expired: true,
            draft: true
          }
        }
      }
    })

    return res.status(200).json({
      companies,
      cursor: companies.length > 0 ? companies[companies.length - 1].id : null
    })
  }

  if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
      trim: true,
      replacement: '-'
    })

    const newCompany = await prisma.company.create({
      data: {
        userId: session.userId,
        createdAt: new Date().toISOString(),
        slug,
        ...req.body
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })

    return res.status(201).json(newCompany)
  }

  res.status(405).send('Method not allowed')
}
