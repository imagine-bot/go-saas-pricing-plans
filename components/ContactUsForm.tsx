import React, { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ContactUsForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const schema = z.object({
    name: z.string().regex(/^[A-Za-z]+$/),
    email: z.string().email(),
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      schema.parse({ name, email });
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, date, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success('Thank you for contacting us!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("Please enter a valid name and email.");
      }
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-4 text-white">Thank you for contacting us!</h2>
        <p className="text-white">We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col items-center mb-4 w-full">
        <label htmlFor="name" className="mb-2 text-white">Name</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} className="border-2 border-gray-200 rounded-md p-1 w-64" required />
      </div>
      <div className="flex flex-col items-center mb-4 w-full">
        <label htmlFor="email" className="mb-2 text-white">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} className="border-2 border-gray-200 rounded-md p-1 w-64" required />
      </div>
      <div className="flex flex-col items-center mb-4 w-full">
        <label htmlFor="date" className="mb-2 text-white">Meeting Date</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} className="border-2 border-gray-200 rounded-md p-1 w-64" required />
      </div>
      <div className="flex flex-col items-start mb-4 w-full">
        <label htmlFor="message" className="mb-2 text-white">Message</label>
        <textarea id="message" value={message} onChange={handleMessageChange} className="border-2 border-gray-200 rounded-md p-1 w-64" rows={4} />
      </div>
      <button type="submit" className="bg-white text-blue-500 rounded-lg px-6 py-2 hover:bg-blue-600 hover:text-white transition-colors duration-300">Submit</button>
    </form>
  );
};

export default ContactUsForm;