import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const fs = require('fs');
        const path = require('path');

        const filePath = path.resolve(process.cwd(), 'data', 'adminData.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const adminData = JSON.parse(fileContents);

        if (credentials.username === adminData.username && credentials.password === adminData.password) {
          return { id: 1, name: 'Admin' };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
});
