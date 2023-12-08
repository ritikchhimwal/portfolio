import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import emailjs from 'emailjs-com';
import Modal from 'react-modal'; // Import the modal library
import { fadeIn } from '../../variants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ message: '', color: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = () => {
    console.log('Sending email...');
    emailjs
      .send(
        'service_17hdkjs',
        'template_921rbp9',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'dUx07TAZ5ltENSZ7q'
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
          
          openModal('Email sent successfully!', 'green');
        },
        (error) => {
          console.error('Error sending email:', error);
          
          openModal('Error sending email. Please try again later.', 'red');
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    sendEmail();
  };

  const openModal = (message, color) => {
    setModalContent({ message, color });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh the page after closing the modal
    window.location.reload();
  };

  return (
    <div className='h-full bg-primary/30'>
      <div className='container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
            Let's <span className='text-accent'>connect.</span>
          </motion.h2>
          {/* form */}
          <motion.form
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
            onSubmit={handleSubmit}
          >
            {/* input group */}
            <div className='flex gap-x-6 w-full'>
              <input
                type='text'
                placeholder='name'
                className='input'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type='text'
                placeholder='email'
                className='input'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <input
              type='text'
              placeholder='subject'
              className='input'
              name='subject'
              value={formData.subject}
              onChange={handleInputChange}
            />
            <textarea
              placeholder='message'
              className='textarea'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <button
              type='submit'
              className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-orange-500 hover:text-white'
            >
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Let's talk
              </span>
              <BsArrowRight className='ml-2' />
            </button>
          </motion.form>

          {/* Modal for displaying success or error message */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              content: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: modalContent.color === 'green' ? '#4CAF50' : '#FF5252',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              },
            }}
          >
            <p>{modalContent.message}</p>
            <button onClick={closeModal}>Close</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
