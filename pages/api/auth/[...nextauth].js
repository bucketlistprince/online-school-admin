import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';

// Resolve the path to users.json file
const usersPath = path.resolve('./data/users.json');
let users = [];

try {
  // Read and parse the user data
  users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
} catch (error) {
  console.error("Error reading users.json file:", error);
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Find user in the JSON file
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          // If user exists and credentials are correct, return user object
          return {
            id: user.email,
            email: user.email,
            role: user.role
          };
        } else {
          // If credentials are invalid
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin' // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user role to session
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  }
});
