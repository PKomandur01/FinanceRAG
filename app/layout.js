// layout.js
import React from 'react';
import { Container, Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <html lang="en">
        <head>
          <title>Finance Manager</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <Container
            sx={{
              padding: '24px',
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Centered Infosys Logo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"
                alt="Infosys Logo"
                style={{
                  width: '180px',
                  height: 'auto',
                  maxWidth: '100%',
                  margin: '0 auto',
                }}
              />
            </Box>

            {/* Main Content */}
            <main>{children}</main>
          </Container>
        </body>
      </html>
    </>
  );
};

export default Layout;
