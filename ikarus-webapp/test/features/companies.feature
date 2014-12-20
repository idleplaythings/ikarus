Feature: Companies
  As a client of Ikarus web application
  I want to manage companies
  So that my players can collaborate easily

  Scenario: Creating a company
    Given player "johndoe123" with Steam ID "123" exists
    And I am logged in as "johndoe123"
    When I create a company called "Härmän Hurjat"
    Then I should be a member of the company "Härmän Hurjat"
