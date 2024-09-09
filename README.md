# **Number Rush**

Number Rush is an interactive math quiz application designed to test users' arithmetic skills under time pressure. The application allows users to create profiles, compete in timed math quizzes, and view their rankings on the leaderboard. As players progress, they unlock more difficult problems, making the game increasingly challenging and fun.

## **Table of Contents**
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Screenshot](#screenshot)
- [Deployed Application](#deployed-application)
- [License](#license)

## **Description**
Number Rush is a math-based quiz game where users aim to solve as many math problems as possible within a set time limit. The faster and more accurate the user is, the higher their score. Users can create profiles, view their previous scores, and see their rank compared to other players on the leaderboard. As users' scores increase, they unlock more difficult problems, pushing their math skills to the limit.

## **Features**
- User authentication: Create an account, login, and track your progress.
- Timed quizzes: Solve as many math problems as possible within a fixed time.
- Leaderboard: See how you rank compared to other users.
- Difficulty scaling: Unlock more challenging questions as your score improves.
- Responsive UI: Enjoy a smooth experience on both desktop and mobile devices.

## **Technologies Used**
- **Frontend:**
  - React.js
  - Apollo Client (for interacting with GraphQL)
  - HTML5, CSS3 (for styling)
  - JavaScript (ES6+)
  
- **Backend:**
  - Node.js
  - Express.js
  - Apollo Server
  - MongoDB with Mongoose (for data storage)
  - GraphQL (for querying and mutating data)
  - JWT (for user authentication)

- **Deployment:**
  - Render (for hosting the backend)
  - Netlify or Vercel (for hosting the frontend)

## **Getting Started**
### Prerequisites
To get a local copy up and running, make sure you have the following installed:
- Node.js
- MongoDB
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:breannacamacho/Number-Rush.git
   ```
2. Navigate to the project directory:
   ```bash
   cd number-rush
   ```

3. Install the dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. Create a `.env` file in the `server` folder to configure your environment variables (e.g., MongoDB URI, JWT secret).

5. Run the application:
   ```bash
   # In the server directory
   npm run start
   ```

6. Open the application in your browser at `http://localhost:3000`.

## **Screenshot**

![Number Rush Screenshot](https://via.placeholder.com/800x400)  
*Sample screenshot of the Number Rush game interface, showcasing the quiz and leaderboard.*

## **Deployed Application**

Check out the live version of Number Rush at:  
**[Number Rush Deployed Application](#)** *(Update with the actual deployed link once available)*

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Once your project is deployed, make sure to:
- Update the **Deployed Application** section with the actual live link.
- Replace the placeholder screenshot link with a real screenshot from your project.
