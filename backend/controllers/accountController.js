const addAccount = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        // Memastikan ukuran file tidak melebihi batas
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size exceeds the maximum limit of 50MB.' });
        }
        return res.status(400).json({ message: 'File upload error: ' + err.message });
      }
  
      try {
        const { name, email, password, role, status } = req.body;
        const photo = req.file ? req.file.buffer : null;
  
        // Memeriksa apakah email sudah digunakan
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
          return res.status(400).json({ message: 'Email is already in use.' });
        }
  
        // Enkripsi password sebelum menyimpannya
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Membuat account baru
        const newAccount = new Account({
          name,
          email,
          password: hashedPassword,
          role,
          status,
          photo,
        });
  
        // Simpan account ke MongoDB
        await newAccount.save();
  
        // Response berhasil
        res.json({ message: 'Account successfully created!', account: newAccount });
      } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Error creating account' });
      }
    });
  };
  