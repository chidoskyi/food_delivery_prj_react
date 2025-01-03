// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardMessage,CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
// import Toast from '@/hooks/Toast';
// import { useToast } from '@/hooks/use-toast'; // Assuming you're using your custom toast hook
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer
import axios from 'axios';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // const { toast } = useToast(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [showToast, setShowToast] = useState(false);
  // const [toastConfig, setToastConfig] = useState({
  //   title: '',
  //   description: '',
  //   variant: 'default',
  // });

  // Fetch existing form data (if any)
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact/`);
        if (response.data && response.data.length > 0) {
          setFormData(response.data[0]); // Assuming only one record is relevant
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchFormData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/contact/`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        // Log to ensure toast is being called
      console.log("Form submitted successfully, showing toast");
        // toast({
        //   title: 'Message Sent Successfully',
        //   description: 'Thank you for reaching out. We will respond shortly.',
        //   variant: 'success',
        // });
        toast.success('Message Sent Successfully! Thank you for reaching out. We will respond shortly.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        // toast({
        //   title: 'Error',
        //   description: 'There was an issue submitting your message. Please try again.',
        //   variant: 'destructive',
        // });
        toast.error('There was an issue submitting your message. Please try again.');
      } finally {
        setIsLoading(false);
        // setShowToast(true);
      }
    }, 2000);
  };

  // console.log("Form submitted successfully, showing toast");
  //       toast.success('Message Sent Successfully! Thank you for reaching out. We will respond shortly.');
  //       setFormData({
  //         name: '',
  //         email: '',
  //         subject: '',
  //         message: '',
  //       });
  //     } catch (error) {
  //       console.error('Error submitting contact form:', error);
  //       toast.error('There was an issue submitting your message. Please try again.');
  //     } finally {

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            Get in Touch with Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-lg text-muted-foreground"
          >
            Have questions or need assistance? Send us a message, and we’ll respond as soon as possible.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-16 max-w-xl"
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardMessage>Fill out the form below to send us a message.</CardMessage>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* {showToast && (
        <Toast
          title={toastConfig.title}
          description={toastConfig.description}
          variant={toastConfig.variant}
          duration={3000}
          onDismiss={() => setShowToast(false)}
        />
      )} */}
      <ToastContainer />
    </div>
  );
};