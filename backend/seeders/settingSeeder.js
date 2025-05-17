module.exports = async (Setting) => {
  const predefinedSettings = [
    { key: 'site_name', value: 'My Cool Website' },
    { key: 'contact_email', value: 'admin@example.com' },
    { key: 'maintenance_mode', value: 'off' },
    { key: 'home_title', value: 'Welcome to Our Site!' },
    { key: 'home_sub-title', value: 'Pleasure to meet you!' },
    { key: 'footer_text', value: '© 2025 My Company' },
  ];

  for (const setting of predefinedSettings) {
    await Setting.findOrCreate({
      where: { key: setting.key },
      defaults: { value: setting.value, password: '-', role: '-', status: 'active', photo: null }
    });
  }

  console.log('✅ Settings seeded (if not already present)');
};