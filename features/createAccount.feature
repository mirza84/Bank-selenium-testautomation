Feature: 
To be able to create an account

Scenario: To be able to create an account
Given that I am on the login page
And that I enter my user name as 'Mirza' and password as 'tester'
When I press the login button
Then I should get access to my account
When I press 'Mina konton' button
Then 'my-accounts' page should load
When I press 'Lägg till ett nytt konto' button
And 'Lägg till konto' popup window should appear
When I enter an account name
And press the 'Lägg till' button
Then the account should be added to the account list