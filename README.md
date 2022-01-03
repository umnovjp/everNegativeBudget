# everNegativeBudget
## Functionality
This app allows user with or without network connection to enter expenses and withdrawals. Transaction is shown on the page even if there is no connection. Transaction is added to database when a user is back online. In the screenshot below, I entered last transaction. 
![image](https://user-images.githubusercontent.com/88174852/147983629-9cfafd00-bdbd-492a-9c59-02ab88e5e8dc.png)
I had an error message in console.log because I was offline. Function SaveRecord was invoked. As a user is back online, check db is invoked. Transations are added to the database. Two screenshots above were made on heroku app. ![image](https://user-images.githubusercontent.com/88174852/147985064-ebcb48fd-729d-41e3-b10e-b6655a14fde4.png)
I can verify database on my local computer using Robo 3T. 
![image](https://user-images.githubusercontent.com/88174852/147984269-1a49e7fd-279d-4242-aedd-b3b08cc7834c.png)
## Technologies used 
MongoDB was used along with its ODM (object data modeling) library called mongoose. Also, express.js was used to run app on a server. It is deployed on heroku. 
## Links
### Github: https://github.com/umnovjp/everNegativeBudget/edit/main/README.md
### Heroku: https://nameless-brushlands-27009.herokuapp.com/
