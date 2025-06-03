import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (isSending) return; // prevent double click

    setIsSending(true);

    const formData = {
      name: form.current.user_name.value,
      email: form.current.user_email.value,
      message: form.current.message.value,
      title: `${form.current.user_name.value} wants to connect`
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        toast.success('Message sent successfully!');
        form.current.reset();
      })
      .catch((error) => {
        toast.error('Failed to send message. Try again later.');
        console.error('EmailJS Error:', error);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left Side */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold">
            <span className="text-purple-400">Yo, I'm Shiv!</span>
          </h1>
          <h2 className="text-3xl font-semibold">
            <span className="text-purple-400">Looking to build, collaborate or get hired? Let's chat.</span>
          </h2>
          <p className="text-lg text-gray-300">
            Whether it’s about a project, a tech idea, or a job opportunity — I'm all ears.
          </p>
          <p className="text-md text-gray-500 italic">PS: I reply fast 🙂</p>
        </div>

        {/* Right Side */}
        <div className="flex-1 w-full">
          <form ref={form} onSubmit={sendEmail} className="bg-gray-900/50 p-8 rounded-lg backdrop-blur-md space-y-6">
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
                placeholder="you@example.com"
                className="w-full bg-gray-800/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Let's build something cool..."
                rows="6"
                className="w-full bg-gray-800/50 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full flex justify-center items-center gap-2 ${
                isSending ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'
              } text-white font-semibold py-3 px-6 rounded-md transition duration-300`}
            >
              {isSending ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
