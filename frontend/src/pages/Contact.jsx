import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // simple front-end validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        'service_9yb35zy',
        'template_n0e6l29',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'WP6xc3p2lThdZxpxf'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Contact Info */}
          <aside className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Questions about the calculator, partnership or volunteering? Send us a message and we'll respond shortly.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Address</h4>
                  <p className="text-sm text-gray-600">RKGIT, Ghaziabad City</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-sky-50 text-sky-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Phone</h4>
                  <p className="text-sm text-gray-600">(+91) 7835927718</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Email</h4>
                  <p className="text-sm text-gray-600">abhisheksingh56611@gmail.com</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 border-t pt-4">
              <p className="text-xs text-gray-500">We aim to reply within 2 business days.</p>
            </div>
          </aside>

          {/* Contact Form */}
          <section className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Send a message</h3>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Name</span>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="Your full name"
                    aria-label="Name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="you@example.com"
                    aria-label="Email"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Subject</span>
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  placeholder="Brief subject"
                  aria-label="Subject"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                  placeholder="Write your message..."
                  aria-label="Message"
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white font-medium transition ${
                    isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    setSubmitStatus(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Reset
                </button>

                <div className="ml-auto">
                  {submitStatus === 'success' && (
                    <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Message sent</span>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Submission error</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
