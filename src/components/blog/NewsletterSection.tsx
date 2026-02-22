'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await supabaseClient
        .from('newsletter_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: 'blog_signup'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast.error("This email is already subscribed to our newsletter.");
        } else {
          throw error;
        }
      } else {
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail('');
      }
    } catch (error) {
      console.log('Newsletter subscription error:', error);
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="newsletter" className="theme-bg call_action_wrap-wrap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="call_action_wrap text-center p-4" style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
              <div className="col-12 mb-3">
                <i className="fas fa-envelope fa-2x text-primary"></i>
              </div>
              <div className="col-12 text-dark">
                <h3 className="mb-2 text-dark">Join Our Newsletter</h3>
                <p className="mb-4 h6">Get the latest study abroad tips, scholarship opportunities, and visa updates delivered to your inbox.</p>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit} className="d-flex justify-content-center" style={{ gap: "8px" }}>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn theme-bg text-white btn-md" type="submit" disabled={isLoading}>
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}