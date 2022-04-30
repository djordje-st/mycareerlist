import {
  Modal,
  Box,
  TextInput,
  Textarea,
  SimpleGrid,
  Select,
  InputWrapper,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import axios from 'axios'
import { FC, useState } from 'react'
import StarPicker from 'react-star-picker'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from 'react-query'

interface IProps {
  open: boolean
  setOpen: (open?: boolean) => void
  companyId: string
}

const ReviewForm: FC<IProps> = ({ open, setOpen, companyId }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      rating: 0,
      pros: '',
      cons: '',
      status: '',
      companyId
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)

    try {
      await axios.post('/api/review', values)

      showNotification({
        title: 'Review posted!',
        message: 'Thank you for your feedback',
        color: 'green'
      })

      queryClient.invalidateQueries('reviews')

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
      title="Review form"
      centered
      size="lg"
    >
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          mb="md"
          {...form.getInputProps('title')}
          required
        />

        <Textarea
          label="Review"
          mb="md"
          {...form.getInputProps('content')}
          required
        />

        <Textarea label="Pros" mb="md" {...form.getInputProps('pros')} />

        <Textarea label="Cons" mb="md" {...form.getInputProps('cons')} />

        <SimpleGrid cols={2}>
          <Select
            label="Employment status"
            {...form.getInputProps('status')}
            required
            data={['Employed', 'Previously employed']}
          />

          <InputWrapper label="Rating" required mb="md">
            {/* @ts-ignore */}
            <StarPicker
              value={form.values.rating}
              // @ts-ignore
              onChange={value => form.setFieldValue('rating', value)}
              name="rating"
            />
          </InputWrapper>
        </SimpleGrid>

        <Button type="submit" loading={loading}>
          Post review
        </Button>
      </Box>
    </Modal>
  )
}

export default ReviewForm