# Anime X OTT App

**Anime X App** is a React Native Expo application that lets users explore and enjoy animated series. The app provides a user-friendly interface to watch anime and files stored on a separate NodeJS server.

## Features

- **Authentication:** Securely access your account with authentication features, ensuring your personal data protected.

- **Search Filters:** Easily find anime titles using categorized search filters, allowing users to refine their search by anime name.

- **Wishlist:** Create a wishlist of anime titles you're interested in watching, making it easy to keep track of shows you want to explore in the future.

- **Favorite Episodes:** Mark specific episodes as favorites to quickly access and rewatch your most beloved moments within a series.
  
## Getting Started

Follow these steps to get the app up and running on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed
- [Mongo DB](https://www.mongodb.com/) installed
  
### Installation

**Front-End**
1. Clone the repository:

    ```
    git clone https://github.com/just-manoj/animeX.git
    ```

2. Navigate to the project directory:

    ```
    cd animeX
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the Expo development server:

    ```
    npx expo start
    ```

5. Change the ip address in Domain.js file
   
6. Use the Expo client on your mobile device or an emulator to run the app.

**Back-End**
1. Clone the repository:

    ```
    git clone https://github.com/just-manoj/Anime-X-Node.git
    ```

2. Navigate to the project directory:

    ```
    cd Anime-X-Node
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the Expo development server:

    ```
    npx start
    ```

5. Change the ip address in Domain.js file

6. Create another Node js project and add all anime episodes in assets and make that public.

## Usage

1. **SignUp Screen:**
   - The user creates their account here with inputs of name, mail, birthday, and password.
  
2. **Login Screen:**
   - The user logs in with their email and password.
   - If the user forgot their password, click forgot password to receive an OTP from registered email.
   - Then navigate to the reset password screen to change the password.
  
3. **Main Screen:**
   - It shows posters of all anime, category-wise.
   - It also has a search bar to find anime.
   - If you tap the anime poster, then go to the Anime Detail Screen.

4. **Anime Detail Screen:**
   - It shows a promo video for the anime.
   - It shows anime details like the title, number of seasons, number of episodes, studio, and description of the anime.
   - Also show the list of episode thumnails and episode data like title, description, number of episodes, and duration.
   - We can add anime to our wishlist or add particular episodes to our favorites list.
   - Also show the number of seasons horizontally, and we can choose a specific season.
  
5. **Anime Player Screen:**
   - It renders the particular episode on full screen.
     
6. **Profile Screen:**
   - It lists all the data about the user.
   - It also shows the Wishlist and Favorite List tabs.
   - Here is a place to verify our email ID with OTP verification.
   - Also, reset your password here.
   - The logout button is available here.
   
## Acknowledgments

- Special thanks to [Expo](https://expo.dev/), [Node Js](https://nodejs.org/), and [Mongo DB](https://www.mongodb.com/) for their fantastic tools and services.

## Contact

For any inquiries, please contact iammanojofficial@gmail.com

## ScreenShots
<h3>SignUp Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/3c953824-daab-4214-83ce-366e5196b055" width="360" height="750">
<h3>LogIn Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/842b299c-1725-4842-977c-2799230cd860" width="360" height="750">
<h3>OTP Verification</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/2d2c901b-d283-4420-85fd-858f549a019f" width="360" height="750">
<h3>Reset Password Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/634e4642-c357-4f62-b85a-34ebaf9a6c09" width="360" height="750">
<h3>Main Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/a9a304ae-4723-4da7-b43c-dc94556356aa" width="360" height="750">
<h3>CategoryWise Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/7cf72031-8cb6-4ee3-9839-2f4a3f57bd5e" width="360" height="750">
<h3>Anime Detail Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/de8e08ce-7c24-4bff-889b-e40a3592d46c" width="360" height="750">
<h3>Change Season</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/56df965a-0088-43dc-8c0c-b0a658825a3a" width="360" height="750">
<h3>Anime Player Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/d1b07373-8fc8-4ef9-9f5e-d2f3e30248c0" width="360" height="750">
<h3>Profile Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/ca9652b2-faa5-44c5-996a-0b6a2355eafd" width="360" height="750">
<h3>WishList Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/f1c09c40-ad32-4e80-a44e-2c238ddf06a3" width="360" height="750">
<h3>Favorite Episode Screen</h3><img src="https://github.com/just-manoj/animeX/assets/111769769/cb858120-4b57-4c43-9468-5e100f88c470" width="360" height="750">
