Feature:
To be able to login into my account.
To be able to create, delete and rename an account.

Scenario: Log in into my account
Given that I am on the login page
And that I enter my user name as 'tester' and password as 'tester'
When I press the login button
Then I should get access to my account
When I press 'Överföringar mina konton' button
And choose to transfer from 'Lönekonto' to 'Sparkonto'
And enter the amount to be transferred
When I press the 'Utför' button
And I choose to transfer ten times 
Then when I press 'Mina konton' button
And press 'Lönekonto'
Then I should be able to see the last ten transfers
