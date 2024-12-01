**Testing Guide for ShopYangu Admin Panel**
This document provides an overview of the testing setup and guidelines for the ShopYangu Admin Panel project.

**Testing Framework**
We use Jest as our primary testing framework, along with React Testing Library for testing React components. This combination allows us to write unit tests, integration tests, and end-to-end tests effectively.

Jest: A testing framework to run and organize tests.
React Testing Library: A library to render and interact with React components in a way that resembles how users would interact with them.
Test File Organization
Test files are located in the **tests** directory at the root of the project.
The directory structure within **tests** mirrors the main src directory structure.
Test files are named with the .test.ts or .test.tsx extension.
For example with our directory:

/**tests**
/components
Dashboard.test.tsx
ProductForm.test.tsx
ProductList.test.tsx
ShopList.test.tsx
/api
auth.test.ts

**Running Tests**
To run the tests, use one of the following commands depending on your package manager:

npm:

npm test

yarn:

yarn test

pnpm:

pnpm test

Make sure your development server is running before running the tests.
