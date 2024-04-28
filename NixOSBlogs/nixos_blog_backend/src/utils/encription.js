const SECRET_DELTA = 15;

/**
 * To encrypt a password we would usually need a salt.
 * Since this is a dummy project we'll not encrypt them much
 * @param {string} password - The password to encrypt.
 * @returns {string} The encripted password.
 */
const encryptPassword = (password) => {
  return [...password].map((c) => c.codePointAt(0) + SECRET_DELTA).join("");
};

export default encryptPassword;
