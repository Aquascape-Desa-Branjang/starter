module.exports = async (Setting) => {
  const predefinedSettings = [
    { key: 'home_title', value: 'Welcome to Aquascape!' },
    { key: 'home_sub-title', value: 'Feel free to look around!' },
    { key: 'home_about', value: 'We provide awesome aquarium decorations and ...' },
    { key: 'home_video-link', value: 'https://www.youtube.com/watch?v=3r-qDvD3F3c' },
    { key: 'home_product', value: 'something something' },
    { key: 'contact_email', value: 'admin@example.com' },
    { key: 'maintenance_mode', value: 'off' },
    { key: 'footer_text', value: '© 2025 My Company' }, 
    // dan lain-lain
  ];

  for (const setting of predefinedSettings) {
    await Setting.findOrCreate({
      where: { key: setting.key },
      defaults: { value: setting.value, password: '-', role: '-', status: 'active', photo: null }
    });
  }

  console.log('✅ Settings seeded (if not already present)');
};