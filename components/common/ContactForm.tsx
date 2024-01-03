import { useState } from 'react'
import axios from 'axios'

import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

interface ContactInputs {
  name: string
  email: string
  message: string
}

const ContactForm = () => {

  // State for contact form. 
  const [contactInputs, setContactInputs] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Response Message state
  const [message, setMessage] = useState('')
  const [emailPending, setEmailPending] = useState(false)


  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, contactInputs: ContactInputs) => {
    event.preventDefault()
    setEmailPending(true)
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/api/sendEmail`, contactInputs)
      // Handle successful submission (e.g., display a success message)

      if (data.status === 'ok') {
        setMessage(data.message)
        // Clear form fields or display a success message
        setContactInputs({
          name: '',
          email: '',
          message: ''
        })
        setTimeout(() => {
          setMessage('')
        }, 30000)
      }
      
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error sending email:', error)
      // Display an error message to the user
    } finally {
      setEmailPending(false) // Set emailPending to false once the response is received
    }
  }
  
  // Changes value for the contact form
  const onChangeContactInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactInputs(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild className='w-full'>
        <Button  className='w-full text-xl h-12'>Contact Us</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription className='text-foreground'>
            Tell us about the asset that you would like to have a restaking pool created for.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4 text-sm'>
          <div className='flex flex-col gap-2 w-5/6 mx-auto'>
            <label htmlFor="text" className='text-sm'>Name</label>
            <input 
              className='border border-primary/50 bg-background p-2 rounded-md'
              type={'text'}
              placeholder={'Enter your name'}
              name='name'
              value={contactInputs.name}
              onChange={onChangeContactInputs}
            />
          </div>
          <div className="flex flex-col gap-2 w-5/6 mx-auto">
            <label htmlFor="email" className='text-sm'>Email</label>
            <input 
              className='border border-primary/50 bg-background p-2 rounded-md'
              type={'email'}
              placeholder={'Enter your email'}
              name='email'
              value={contactInputs.email}
              onChange={onChangeContactInputs}
            />
          </div>
          <div className="flex flex-col gap-2 w-5/6 mx-auto">
            <label htmlFor="text" className='text-sm'>Message</label>
            <textarea 
              className='min-h-[100px] border border-primary/50 bg-background p-2 rounded-md'
              placeholder={'Tell us what asset you would like to have us create a restaking pool for.'}
              name='message'
              value={contactInputs.message}
              onChange={onChangeContactInputs}
            />
          </div>
        </div>
        <DialogFooter>
          <div className='flex flex-col gap-2 w-5/6 mx-auto'>
            {emailPending ?
              <Button disabled><Loader className='animate-spin-slow' /></Button>  
              :
              <Button type='submit' onClick={(event) => handleSubmit(event, contactInputs)}>Send</Button>
            }
            {message && 
            <p>{message}</p>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactForm
