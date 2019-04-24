Feature:
To be able to login into my account.
To be able to create, delete and rename an account.

Scenario: Log in into my account
Given that I am on the login page
And that I enter my user name as 'Mirza' and password as 'tester'
When I press the login button
Then I should get access to my account