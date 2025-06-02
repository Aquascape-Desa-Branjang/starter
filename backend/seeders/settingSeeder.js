module.exports = async () => {
  const Setting = require("../models/setting");
  const predefinedSettings = [
    { key: 'home_title', value: 'Selamat Datang di Anto Aquarium & Art' },
    { key: 'home_sub-title', value: 'Nikmati keindahan bawah laut di rumahmu dengan Aquascape' },
    { key: 'home_about', value: 'Menghadirkan keindahan alam bawah air ke dalam ruangan, melalui seni aquascape yang memikat dan menenangkan.' },
    { key: 'home_video-link', value: 'https://www.youtube.com/watch?v=3r-qDvD3F3c' },
    { key: 'home_product', value: 'Lorem ipsum' },
    
    { key: 'general_logo', value: '/public/uploads/logo.png' },
    { key: 'general_name', value: 'Anto Aquarium & Art' },
    { key: 'general_slogan', value: 'Setiap aquarium adalah canvas, dan setiap batu, kayu, serta tanaman adalah goresan seni.' },
    { key: 'general_copyright', value: 'Copyright  2025, All Right Reserved, Anto Aquarium & Art' },

    { key: 'about_s1_title', value: 'About title 1' },
    { key: 'about_s1_description', value: 'About desc 1' },
    { key: 'about_s1_image', value: '/public/uploads/logo.png' },
    
    { key: 'about_s2_title', value: 'About title 2' },
    { key: 'about_s2_description', value: 'About desc 2' },
    { key: 'about_s2_images', value: 
      JSON.stringify([
      '/public/uploads/image1.png',
      '/public/uploads/image2.png',
      '/public/uploads/image3.png'
      ])
    },
    
    { key: 'about_s3_title', value: 'About title 3' },
    { key: 'about_s3_description', value: 'About desc 3' },
    { key: 'about_s3_image', value: '/public/uploads/logo.png' },
    
    { key: 'about_s4_contact-us', value: '911' },
    
    { key: 'contact_email', value: 'admin@example.com' },
    { key: 'maintenance_mode', value: 'off' },
    { key: 'footer_text', value: '© 2025 My Company' }, 
    // dan lain-lain
  ];

  for (const setting of predefinedSettings) {
    await Setting.findOrCreate({
      where: { key: setting.key },
      defaults: { value: setting.value}
    });
  }
};