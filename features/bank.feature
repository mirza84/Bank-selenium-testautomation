Feature:
#To be able to login into my account.
#To be able to create, delete and rename an account.
#
#Scenario: Log in into my account
#Given that I am on the login page
#And that I enter my user name as 'Mirza' and password as 'tester'
#When I press the login button
#Then I should get access to my account
#
#Scenario: To be able to create an account
#Given that I am on the login page
#And that I enter my user name as 'Mirza' and password as 'tester'
#When I press the login button
#Then I should get access to my account
#When I press 'Mina konton' button
#Then 'my-accounts' page should load
#When I press 'Lägg till ett nytt konto' button
#And 'Lägg till konto' popup window should appear
#When I enter an account name
#And press the 'Lägg till' button
#Then the account should be added to the account list
#
#Scenario: To be able to rename an account
#Given that I am on the login page
#And that I enter my user name as 'Mirza' and password as 'tester'
#When I press the login button
#Then I should get access to my account
#When I press 'Mina konton' button
#Then 'my-accounts' page should load
#When I press the 'ändra kontonamn' button
#Then 'Ändra namn på konto' popup window should appear
#When I enter an account name
#And press the 'ändra' button
#Then the account name should be changed
#
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