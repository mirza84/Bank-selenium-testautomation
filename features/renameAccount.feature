Feature:
To beable to rename an account

Scenario: To be able to rename an account
Given that I am on the login page
And that I enter my user name as 'Mirza' and password as 'tester'
When I press the login button
Then I should get access to my account
When I press 'Mina konton' button
Then 'my-accounts' page should load
When I press the 'ändra kontonamn' button
Then 'Ändra namn på konto' popup window should appear
When I enter an account name
And press the 'ändra' button
Then the account name should be changed