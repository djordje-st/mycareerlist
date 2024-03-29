import {
  Modal,
  Box,
  TextInput,
  Textarea,
  SimpleGrid,
  Select,
  Button,
  Radio,
  Input,
  Rating
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { FC, useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  companyId: string
  companySlug: string
}

const InterviewForm: FC<IProps> = ({
  open,
  setOpen,
  companyId,
  companySlug
}) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      title: '',
      position: '',
      year: 2022,
      hr: '',
      technical: '',
      duration: 2,
      difficulty: 0,
      offer: '',
      rating: 0,
      companyId
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)

    try {
      await axios.post(`/api/company/${companySlug}/interviews`, values)

      showNotification({
        title: 'Interview experience posted!',
        message: 'Thank you for your feedback',
        color: 'green'
      })

      queryClient.invalidateQueries(['company'])

      setOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Interview experience form"
      centered
      size="lg"
    >
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          mb="md"
          required
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Position"
          mb="md"
          required
          autosize
          minRows={2}
          {...form.getInputProps('position')}
        />

        <Textarea
          label="HR interview"
          autosize
          minRows={2}
          mb="md"
          required
          {...form.getInputProps('hr')}
        />

        <Textarea
          label="Technical interview (if applicable)"
          autosize
          minRows={2}
          mb="md"
          {...form.getInputProps('technical')}
        />

        <SimpleGrid cols={2}>
          <Select
            label="What year was the interview?"
            mb="md"
            required
            data={[
              '2022',
              '2021',
              '2020',
              '2019',
              '2018',
              '2017',
              '2016',
              '2015'
            ]}
            defaultValue="2022"
            {...form.getInputProps('year')}
          />

          <Select
            label="How long was the selection process?"
            mb="md"
            required
            data={['1', '2', '3', '4', '5', '6']}
            placeholder="Select number of weeks"
            {...form.getInputProps('duration')}
          />
        </SimpleGrid>

        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 768, cols: 1 }]} mb="md">
          <Radio.Group
            label="How difficult was the inteview?"
            required
            {...form.getInputProps('difficulty')}
          >
            <Radio value="1" label="Easy" />
            <Radio value="2" label="Medium" />
            <Radio value="3" label="Hard" />
          </Radio.Group>

          <Input.Wrapper label="Rating" required error={form.errors.rating}>
            <Rating
              defaultValue={form.values.rating}
              onChange={value => form.setFieldValue('rating', value)}
              name="rating"
              size="xl"
            />
          </Input.Wrapper>
        </SimpleGrid>

        <Radio.Group
          label="Did you receive an offer?"
          required
          mb="lg"
          {...form.getInputProps('offer')}
        >
          <Radio value="accepted" label="Yes, I accepted it" />
          <Radio value="declined" label="Yes, I declined it" />
          <Radio value="no" label="Didn't receive an offer" />
        </Radio.Group>

        <Button type="submit" loading={loading}>
          Post interview experience
        </Button>
      </Box>
    </Modal>
  )
}

export default InterviewForm
