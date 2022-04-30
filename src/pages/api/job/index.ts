import type { Job } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import slugify from 'slugify'
import prisma from '~/utils/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (req.method === 'GET') {
    const { jobs, cursor } = await fetchJobs(req.query)

    return res.status(200).json({
      jobs,
      cursor
    })
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const newJob = await createJob(req.body)

    return res.status(201).json(newJob)
  }

  if (req.method === 'PUT') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!req.body.slug && !req.body.save) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    let savedBy

    if (req.body.save) {
      savedBy = {
        connect: {
          id: session.userId
        }
      }
    } else {
      savedBy = {
        disconnect: {
          id: session.userId
        }
      }
    }

    await prisma.job.update({
      where: {
        slug: req.body.slug
      },
      data: {
        savedBy
      },
      select: {
        savedBy: {
          select: {
            email: true,
            id: true
          }
        }
      }
    })

    return res.status(200).json({ success: true })
  }

  res.status(400).json({ message: 'Bad request' })
}

const createJob = async (body: Job) => {
  const newJob = await prisma.job.create({
    data: {
      ...body
    },
    select: {
      title: true,
      slug: true,
      company: {
        select: {
          name: true
        }
      }
    }
  })

  prisma.$use(async (params, next) => {
    if (params.model == 'Job' && params.action == 'create') {
      const slug = slugify(`${newJob.title}-at-${newJob.company.name}`, {
        lower: true,
        strict: true,
        trim: true,
        replacement: '-'
      })

      params.args.data.slug = slug
    }

    return await next(params)
  })

  return newJob
}

const fetchJobs = async (query: any) => {
  const {
    cursor,
    title,
    location,
    category,
    type
  }: {
    cursor?: string
    title?: string
    location?: string
    category?: string
    type?: string
  } = query

  const jobs = await prisma.job.findMany({
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      title: {
        contains: title || undefined
      },
      category: {
        equals: category || undefined
      },
      type: {
        equals: type || undefined
      },
      location: {
        equals: location || undefined
      },
      expired: {
        not: true
      },
      draft: {
        not: true
      }
    },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      category: true,
      type: true,
      applyLink: true,
      location: true,
      city: true,
      featured: true,
      company: {
        select: {
          name: true,
          logo: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    jobs,
    cursor: jobs.length > 0 ? jobs[jobs.length - 1].id : null
  }
}