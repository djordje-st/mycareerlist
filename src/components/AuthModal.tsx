import {
  Modal,
  Group,
  Button,
  Box,
  TextInput,
  Text,
  Stack
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { signIn } from 'next-auth/react'
import { FC, useState } from 'react'
import regex from '~/constants/regex'

interface IProps {
  opened: boolean
  setOpened: (opened: boolean) => void
}

const AuthModal: FC<IProps> = ({ opened, setOpened }) => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: ''
    },

    // @ts-ignore
    validate: {
      email: (value: string) =>
        regex.email.test(value) ? null : 'Invalid email'
    }
  })

  const handleSubmit = async (formData: typeof form.values) => {
    setLoading(true)

    try {
      await signIn('email', {
        email: formData.email,
        redirect: false,
        callbackUrl: '/account'
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Access your account"
      centered
    >
      <Stack>
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)} mb="md">
          <TextInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            required
            mb="md"
            data-autofocus
            {...form.getInputProps('email')}
          />

          <Button loading={loading} fullWidth type="submit">
            Log in
          </Button>
        </Box>

        <Box>
          <Group grow mb="sm">
            <Button
              loading={loading}
              onClick={() => signIn('google', { callbackUrl: '/account' })}
              sx={theme => ({
                backgroundColor: '#DB4437',
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.fn.darken('#DB4437', 0.1)
                }
              })}
            >
              Google
            </Button>

            <Button
              loading={loading}
              onClick={() => signIn('facebook', { callbackUrl: '/account' })}
              sx={theme => ({
                backgroundColor: '#1DA1F2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.fn.darken('#1DA1F2', 0.1)
                }
              })}
            >
              Facebook
            </Button>
          </Group>

          <Text align="center" size="xs">
            Your email and personal information are not public.
          </Text>
        </Box>
      </Stack>
    </Modal>
  )
}

export default AuthModal
