import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
          alert('Message sent successfully!');
          form.current.reset();
      }, (error) => {
          alert('Failed to send message. Please try again.');
          console.error('EmailJS Error:', error);
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold">
            <span className="text-purple-400">Bringing your ideas to life.</span>
          </h1>
          <h2 className="text-5xl font-bold">
            <span className="text-purple-400">Let's turn your vision into reality</span>
          </h2>
          <p className="text-xl text-gray-300">
            Have a project in mind or just want to chat? Let's connect!
          </p>
        </div>

        {/* Right side - Contact Form */}
        <div className="flex-1 w-full">
          <form ref={form} onSubmit={sendEmail} className="bg-gray-900/50 p-8 rounded-lg backdrop-blur-sm space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="user_name"
                placeholder="Your Name"
                className="w-full bg-gray-800/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="contact@example.com"
                className="w-full bg-gray-800/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows="6"
                className="w-full bg-gray-800/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;