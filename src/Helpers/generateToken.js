require("dotenv").config();

const baseEncodePassword = (userPassword) => {
    const fixedHeader = process.env.SABRE_HEADER;
    // Step 1: encode fixed header
    const encodedHeader = btoa(fixedHeader);
    // Step 2: encode user password
    const encodedUserPassword = btoa(userPassword);
    // Step 3: concatenate with colon
    const combined = `${encodedHeader}:${encodedUserPassword}`;
    // Step 4: final encode
    const finalPassword = btoa(combined);
    return finalPassword;
};

module.exports = { baseEncodePassword };
