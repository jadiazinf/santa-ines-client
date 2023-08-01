import bcrypt from 'bcrypt';

export const encryptData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(data, salt);
}
