Feature: 
To be able to transfer money between my accounts

Scenario: Transfer money between my accounts
Given that I am on the login page
And that I enter my user name as 'Mirza' and password as 'tester'
When I press the login button
Then I should get access to my account
When I press 'Överföringar mina konton' button
And choose to transfer from 'Lönekonto' to 'Sparkonto'
And enter the amount to be transferred
When I press the 'Utför' button
Then I should be able to see the transfer