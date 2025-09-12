import React from 'react'
import chef1 from '../assets/chef1.jpg';
import chef2 from '../assets/chef2.jpg';

const ContactCard = ({ imageUrl, name, title, email , phone}) => (
  <div className="flex flex-col items-center gap-4 p-6">
    <div 
      className="w-40 h-40 rounded-full bg-cover bg-center" 
      style={{ backgroundImage: `url("${imageUrl}")` }}
    ></div>
    <div>
      <p className="text-stone-900 text-xl font-semibold leading-normal">{name}</p>
      <p className="text-stone-600 text-base font-normal leading-normal">{phone}</p>
      <p className="text-stone-600 text-base font-normal leading-normal">{title}</p>
      <a className="text-[#ec6d13] hover:text-orange-600 text-base font-medium leading-normal transition-colors" href={`mailto:${email}`}>{email}</a>
    </div>
  </div>
);

const Contact = () => {
    const contacts = [
        {
            imageUrl: chef1,
            name: "Hari Shanker",
            title: "Founder & Management Head",
            email: "harish3k@gmail.com",
            phone : "9990651919"
        },
        {
            imageUrl: chef2,
            name: "Meenakshi",
            title: "Co-Founder & Head Chef",
            email: "meenuatri3k@gmail.com",
            phone : "8130307671"
        }
    ];

  return (
    <section className="py-16 sm:py-24 px-4" id="contact">
      <h2 className="text-stone-900 text-4xl font-bold leading-tight tracking-tight text-center mb-12">Get In Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
        {contacts.map((contact, index) => (
            <ContactCard key={index} {...contact} />
        ))}
      </div>
    </section>
  );
};

export default Contact