Feature: Companies
  As a client of Ikarus web application
  I want to manage companies
  So that my players can collaborate easily

  Scenario: Creating a company
    Given player "John Doe" with Steam ID "123" exists
    And I am logged in as "John Doe"
    When I create a company called "Manatee Men"
    Then I should be a member of the company "Manatee Men"
    Then company "Manatee Men" should have an inventory

  Scenario: Inviting players
    Given player "John Doe" with Steam ID "123" exists
    And player "Jane Doe" with Steam ID "456" exists
    And company "Manatee Men" exists
    And I am logged in as "John Doe"
    And I am a member of company "Manatee Men"
    When I invite "Jane Doe" to my company
    Then player "Jane Doe" should have an invitation to "Manatee Men"
