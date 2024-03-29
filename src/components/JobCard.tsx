import { Badge, Box, Group, Paper, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import type { Job } from '~/types/types'
import { getCategory, getLocation, getType } from '~/utils/helpers'

interface IProps {
  job: Job
}

const JobCard: FC<IProps> = ({ job }) => {
  return (
    <Paper p="xs" shadow="xs" sx={{ position: 'relative' }}>
      <Link href={`/jobs/${job.slug}`} passHref legacyBehavior>
        <Box
          component="a"
          sx={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Box
            sx={{
              height: 80,
              width: 80,
              position: 'relative',
              borderRadius: 5,
              overflow: 'hidden',
              backgroundColor: '#fff',

              '@media (max-width: 768px)': {
                height: 75,
                width: 75
              }
            }}
          >
            <Image
              src={job.company.logo || '/no-image.png'}
              alt={job.company.name}
              quality={100}
              width={81}
              height={81}
            />
          </Box>

          <Box
            p={0}
            ml="sm"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column'
            }}
          >
            <Box>
              <Text
                size="lg"
                weight="bold"
                sx={{ '@media (max-width: 768px)': { fontSize: 16 } }}
              >
                {job.title}
              </Text>

              <Text
                mb="xs"
                sx={{ '@media (max-width: 768px)': { fontSize: 15 } }}
              >
                at {job.company.name} &bull;{' '}
                {getLocation(job.city, job.location)}
              </Text>
            </Box>

            <Group>
              <Badge radius="xs">{getType(job.type)}</Badge>

              <Badge radius="xs">{getCategory(job.category)}</Badge>
            </Group>
          </Box>
        </Box>
      </Link>

      {job.featured && (
        <Badge
          variant="filled"
          radius={0}
          sx={{ position: 'absolute', right: 0, top: 0 }}
        >
          Featured
        </Badge>
      )}
    </Paper>
  )
}

export default JobCard
