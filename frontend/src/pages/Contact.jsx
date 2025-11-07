import React from "react";

function Contact() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16 text-gray-800">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* ✅ Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg leading-relaxed">
            Have a question, feedback, or just want to say hi? We'd love to hear
            from you! Feel free to reach out using the form or the contact
            details below.
          </p>

          <div className="space-y-4 mt-6">
            <div>
              <h3 className="text-xl font-semibold">📍 Address</h3>
              <p>Agadir, Morocco</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">📞 Phone</h3>
              <p>+212 6 00 00 00 00</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">📧 Email</h3>
              <p>support@mini-store.com</p>
            </div>
          </div>

          {/* 🗺️ Map Placeholder */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13431.659974080302!2d-9.6027!3d30.4215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6c5c4bdfdcb%3A0xf4a82306a5c8163!2sAgadir!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
              width="100%"
              height="250"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 📨 Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            Send a Message
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message..."
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
